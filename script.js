// ==========================================================================
// DYNAMIC HOVER & TOUCH HEART GENERATOR
// ==========================================================================

const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '💝', '✨'];
let lastHeartTime = 0;
const THROTTLE_MS = 60; // Spawns a heart every 60ms during hover/drag

/**
 * Creates and animates a floating heart at screen coordinates (x, y)
 */
function createHeart(x, y) {
  const heart = document.createElement('span');
  
  // Set styling for floating heart
  heart.className = 'floating-heart';
  heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  
  // Randomize size between 20px and 42px
  const size = Math.random() * 22 + 20;
  heart.style.fontSize = `${size}px`;
  
  // Position heart relative to screen
  heart.style.left = `${x - size / 2}px`;
  heart.style.top = `${y - size / 2}px`;

  document.body.appendChild(heart);

  // Remove from DOM after CSS animation finishes (2 seconds)
  setTimeout(() => {
    heart.remove();
  }, 2000);
}

/**
 * Rate-limits heart creation to avoid performance lag
 */
function handleMove(x, y) {
  const now = Date.now();
  if (now - lastHeartTime > THROTTLE_MS) {
    createHeart(x, y);
    lastHeartTime = now;
  }
}

// --------------------------------------------------------------------------
// 1. MOUSE EVENTS (DESKTOP HOVER & CLICK)
// --------------------------------------------------------------------------

// Mouse Hover / Movement
window.addEventListener('mousemove', (e) => {
  handleMove(e.clientX, e.clientY);
});

// Single Mouse Click
window.addEventListener('click', (e) => {
  createHeart(e.clientX, e.clientY);
});

// --------------------------------------------------------------------------
// 2. TOUCH EVENTS (MOBILE / TABLET TOUCH & SWIPE)
// --------------------------------------------------------------------------

// Single Touch / Tap on screen
window.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    createHeart(touch.clientX, touch.clientY);
  }
});

// Touch Drag / Movement across screen
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }
});