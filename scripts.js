/////////Seleciona os elementos do formulário////////

// Modais de sucesso e erro
const modal_success = document.getElementById('modal-success');
const modal_error = document.getElementById('modal-error');

// formulário
const form = document.querySelector("form")

// Inputs do formulário
const name = document.getElementById("name")
const phone = document.getElementById("phone")
const email = document.getElementById("email")
const message = document.getElementById("message")

// Botão de enviar
const button = document.getElementById("button")


//Captura evento de input para formatar valor
phone.oninput = () => {
    telefone = phone.value

    telefone=telefone.replace(/\D/g,"")                  //Remove tudo o que não é dígito
    telefone=telefone.replace(/^(\d\d)(\d)/g,"($1) $2")  //Coloca parênteses em volta dos dois primeiros dígitos

    if (telefone.length == 14) {
        telefone=telefone.replace(/(\d{5})(\d)/,"$1-$2") //Coloca hífen entre o quinto e o sexto dígitos
    } else {
        telefone=telefone.replace(/(\d{4})(\d)/,"$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
    }

    //atualiza valor do input
    phone.value = telefone
}

//Captura o evento de submit do formulario para obter os valores
form.onsubmit = async (event) => {
    //Previne o comportamento padrão de recarregar a página no submit
    event.preventDefault()

    const data = new FormData(form);
    
    try {
        response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data,
        });

        if (response.status === 200) {
            form.reset();
            modal_success.style.display = 'flex';

            formClear()
        } else {
            modal_error.style.display = 'flex';
            throw new Error("Erro ao enviar o formulário.");
        }
    }
    catch (error) {
        console.error("Error: ", error);
    } 
}

function fecharModal() {
    modal_success.style.display = 'none';
    modal_error.style.display = 'none';
}

//Função para limpar campos após o submit
function formClear() {
    name.value = ""
    phone.value = ""
    email.value = ""
    message.value = ""
}

//////// Audio player ////////

document.querySelectorAll('.custom-audio-player').forEach(player => {
  const audio = player.querySelector('audio');
  const playPauseBtn = player.querySelector('.playPause');
  const progress = player.querySelector('.progress');
  const currentTimeDisplay = player.querySelector('.currentTime');
  const durationDisplay = player.querySelector('.duration');
  const volumeSlider = player.querySelector('.volume');

  // ⏯ Play/Pause
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Pausar os outros áudios
      document.querySelectorAll('audio').forEach(otherAudio => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          const otherPlayer = otherAudio.closest('.custom-audio-player');
          if (otherPlayer) {
            const btn = otherPlayer.querySelector('.playPause');
            if (btn) btn.textContent = '▶';
          }
        }
      });

      audio.play();
      playPauseBtn.textContent = '⏸';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶';
    }
  });

  // ⏱ Duração
  audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
  });

  // ⏳ Progresso
  audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  });

  // 🔁 Alterar progresso manualmente
  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  // 🔊 Volume
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });

  // ⏹ Quando o áudio terminar
  audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶';
  });

  // 🧠 Formatador de tempo
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }
});