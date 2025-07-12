const container = document.getElementById("container");
let isDragging = false;
let offset = { x: 0, y: 0 };

container.addEventListener("mousedown", (e) => {
  isDragging = true;
  offset = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const iframe = window.frameElement;
  const dx = e.clientX - offset.x;
  const dy = e.clientY - offset.y;

  const rect = iframe.getBoundingClientRect();
  iframe.style.left = rect.left + dx + "px";
  iframe.style.top = rect.top + dy + "px";
  iframe.style.bottom = "auto";
  iframe.style.right = "auto";

  offset = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

const transcriptDiv = document.getElementById("transcript");
const startSttBtn = document.getElementById("start-stt");

let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'tr-TR'; // Türkçe için

  let finalTranscript = '';

  recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    transcriptDiv.textContent = finalTranscript + ' ' + interimTranscript;
  };

  recognition.onerror = function(event) {
    transcriptDiv.textContent = 'Hata: ' + event.error;
  };

  startSttBtn.onclick = function() {
    finalTranscript = '';
    transcriptDiv.textContent = '';
    recognition.start();
    startSttBtn.disabled = true;
    startSttBtn.textContent = 'Dinleniyor...';
  };

  recognition.onend = function() {
    startSttBtn.disabled = false;
    startSttBtn.textContent = 'Konuşmayı Yazıya Dökmeye Başla';
  };
} else {
  startSttBtn.disabled = true;
  transcriptDiv.textContent = 'Tarayıcınız konuşma tanıma API desteği vermiyor.';
}
