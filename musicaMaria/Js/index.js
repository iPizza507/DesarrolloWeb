var audio = document.querySelector("audio");
var btnPlay = document.getElementById("pausa");

function reproducir() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function avanzar(fg) {
  audio.currentTime += fg;
}

function retroceder(fg) {
  audio.currentTime -= fg;
}

function parar() {
  audio.pause();
  audio.currentTime = 0;
}

function subirVolumen(vol) {
  audio.volume += vol;
}

function bajarVolumen(vol) {
  audio.volume -= vol;
}

function silenciar(vol) {
  audio.volume = vol;
}
