console.clear();
console.log("By rbnwonknui");

function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(e => console.log('Audio play failed:', e));
}

playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

const url = window.location.href;
if (url === "https://palavreio.app/unica") {
    fetch("https://raw.githubusercontent.com/rbnwonknui/palavreio-hack/refs/heads/main/Versions/Unica.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url === "https://palavreio.app/duplinha") {
    fetch("https://raw.githubusercontent.com/rbnwonknui/palavreio-hack/refs/heads/main/Versions/Duplinha.js")
        .then(r => r.text())
        .then(r => eval(r));
} else {
    window.location.href = "https://palavreio.app/";
}
// apenas indexando carai
