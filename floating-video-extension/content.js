const container = document.createElement('div');
container.style.position = 'fixed';
container.style.width = '320px';
container.style.height = '180px';
container.style.zIndex = '999999';
container.style.background = 'linear-gradient(135deg, #a4508b 0%, #f7667f 100%)';
container.style.border = '1.5px solid rgba(255,255,255,0.18)';
container.style.borderRadius = '18px';
container.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
container.style.backdropFilter = 'blur(8px)';
container.style.WebkitBackdropFilter = 'blur(8px)';
container.style.cursor = 'move';
container.style.resize = 'both';
container.style.overflow = 'hidden';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'stretch';
container.style.justifyContent = 'flex-start';
container.style.padding = '0';
container.style.boxSizing = 'border-box';
container.style.pointerEvents = 'auto';

// Container başlangıç konumunu left/top ile ayarla
container.style.left = 'calc(100vw - 340px)';
container.style.top = 'calc(100vh - 200px)';
container.style.right = '';
container.style.bottom = '';

// ✖ Kapat Butonu
const closeButton = document.createElement('div');
closeButton.textContent = '';
closeButton.title = 'Kapat';
closeButton.style.position = 'absolute';
closeButton.style.width = '32px';
closeButton.style.height = '32px';
closeButton.style.top = '10px';
closeButton.style.right = '10px';
closeButton.style.display = 'flex';
closeButton.style.alignItems = 'center';
closeButton.style.justifyContent = 'center';
closeButton.style.cursor = 'pointer';
closeButton.style.background = 'rgba(30,30,30,0.45)';
closeButton.style.transition = 'background 0.2s, box-shadow 0.2s';
closeButton.onmouseenter = () => {
  closeButton.style.background = 'rgba(255, 60, 60, 0.7)';
  closeButton.style.boxShadow = '0 2px 8px rgba(255,60,60,0.25)';
};
closeButton.onmouseleave = () => {
  closeButton.style.background = 'rgba(30,30,30,0.45)';
  closeButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
};
closeButton.style.zIndex = '1000000';
closeButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
closeButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="rgba(0,0,0,0.0)"/><path d="M5 5L11 11M11 5L5 11" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

closeButton.addEventListener('click', () => {
  container.remove();
});

// 🎬 Video
const video = document.createElement('video');
video.src = chrome.runtime.getURL('video/videoplayback.mp4');
video.controls = true;
video.autoplay = true;
video.style.width = '100%';
video.style.height = '100%';
video.style.flexGrow = '1';
video.style.objectFit = 'contain'; // cover yerine contain
video.style.display = 'block';
video.style.borderRadius = '12px';
video.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.18)';
video.style.backgroundColor = '#111';
video.style.position = 'relative';

// Gradient overlay ekle
const gradientOverlay = document.createElement('div');
gradientOverlay.style.position = 'absolute';
gradientOverlay.style.left = '0';
gradientOverlay.style.right = '0';
gradientOverlay.style.bottom = '0';
gradientOverlay.style.height = '40px';
gradientOverlay.style.pointerEvents = 'none';
gradientOverlay.style.borderRadius = '0 0 12px 12px';
gradientOverlay.style.background = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,20,20,0.35) 100%)';

// Container'a relative konumlandırma
container.style.position = 'fixed';
container.style.overflow = 'hidden';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'stretch';
container.style.justifyContent = 'flex-start';
container.style.padding = '0';
container.style.boxSizing = 'border-box';
container.style.pointerEvents = 'auto';
container.style.minWidth = '180px';
container.style.minHeight = '120px';

// DOM’a ekle
container.appendChild(closeButton);
container.appendChild(video);
container.appendChild(gradientOverlay);
document.body.appendChild(container);

// 🖱️ Sürükleme
let isDragging = false;
let offsetX, offsetY;

container.addEventListener('mousedown', (e) => {
  // resize köşesini tutuyorsa sürükleme başlatma
  if (e.target === container && e.offsetX > container.clientWidth - 20 && e.offsetY > container.clientHeight - 20) return;
  // kapat butonuna tıkladıysa sürükleme başlatma
  if (e.target === closeButton) return;

  isDragging = true;
  offsetX = e.clientX - container.getBoundingClientRect().left;
  offsetY = e.clientY - container.getBoundingClientRect().top;
  container.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    container.style.left = `${e.clientX - offsetX}px`;
    container.style.top = `${e.clientY - offsetY}px`;
    container.style.right = '';
    container.style.bottom = '';
    container.style.position = 'fixed';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'move';
});
