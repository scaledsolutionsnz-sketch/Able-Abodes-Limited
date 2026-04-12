'use strict';

const overlay   = document.getElementById('vrOverlay');
const enterBtn  = document.getElementById('enterVR');
const controls  = document.getElementById('vrControls');
const exitBtn   = document.getElementById('exitBtn');
const vrModeBtn = document.getElementById('vrModeBtn');
const video     = document.getElementById('vr-video');
const sceneText = document.getElementById('scene-title');

function enterExperience() {
  // Fade overlay out then hide it
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  setTimeout(() => overlay.classList.add('hidden'), 400);

  // Reveal bottom controls
  controls.classList.remove('hidden');

  // Play video now that we have a user gesture (satisfies autoplay policy)
  if (video) {
    video.muted = false;
    video.play().catch(() => {
      // Some browsers still block unmuted autoplay; fall back to muted
      video.muted = true;
      video.play().catch(() => {});
    });
  }

  // Reveal the in-scene floating title
  if (sceneText) {
    sceneText.setAttribute('visible', 'true');
  }
}

function exitExperience() {
  overlay.classList.remove('hidden');
  overlay.style.opacity = '';
  overlay.style.pointerEvents = '';

  controls.classList.add('hidden');

  if (video) video.pause();
  if (sceneText) sceneText.setAttribute('visible', 'false');
}

function toggleVRMode() {
  const scene = document.querySelector('a-scene');
  if (!scene) return;

  if (scene.is('vr-mode')) {
    scene.exitVR();
  } else {
    scene.enterVR();
  }
}

enterBtn.addEventListener('click', enterExperience);
exitBtn.addEventListener('click', exitExperience);
vrModeBtn.addEventListener('click', toggleVRMode);
