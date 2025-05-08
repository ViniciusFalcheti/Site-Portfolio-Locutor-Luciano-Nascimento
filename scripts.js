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

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

let isPlaying = false;

// Formata tempo (segundos) para mm:ss
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});