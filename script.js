const giftBox = document.getElementById('gift-box');
const message = document.getElementById('message');
const confettiContainer = document.getElementById('confetti-container');

let opened = false;

giftBox.addEventListener('click', openGift);

function openGift() {
  if (opened) return;
  opened = true;

  // Open the gift
  giftBox.classList.add('opening');

  // Show message after delay
  setTimeout(() => {
    message.classList.remove('hidden');
    setTimeout(() => {
      message.classList.add('show');
      startStatsAnimation();
    }, 50);

    // Create confetti
    createConfetti();
  }, 400);

  // Hide gift box
  setTimeout(() => {
    giftBox.style.opacity = '0';
  }, 800);
}

function createConfetti() {
  const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
  
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Start from center
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      
      // Random explosion direction
      const angle = Math.random() * Math.PI * 2;
      const velocity = 300 + Math.random() * 500;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;
      
      confetti.style.setProperty('--dx', dx + 'px');
      confetti.style.setProperty('--dy', dy + 'px');
      
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      // Random shape
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
      } else {
        confetti.style.borderRadius = '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      }

      confetti.style.animationDelay = '0s';
      confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
      confettiContainer.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 10);
  }
}

function startStatsAnimation() {
  const stats = [
    { label: 'YEARS', value: '22' },
    { label: 'DAYS', value: '8,036' },
    { label: 'HOURS', value: '192,852' },
    { label: 'MINUTES', value: '11,571,120' },
    { label: 'SECONDS', value: '694,267,200' }
  ];

  const statsElement = document.getElementById('stats');
  const statsLabel = document.getElementById('stats-label');
  const statsValue = document.getElementById('stats-value');

  let currentIndex = 0;

  function updateStat() {
    statsElement.classList.remove('show');
    
    setTimeout(() => {
      statsLabel.textContent = stats[currentIndex].label;
      statsValue.textContent = stats[currentIndex].value;
      statsElement.classList.add('show');
      
      currentIndex = (currentIndex + 1) % stats.length;
    }, 300);
  }

  // Start after a short delay
  setTimeout(() => {
    statsElement.classList.remove('hidden');
    updateStat();
    setInterval(updateStat, 2500);
  }, 1500);
}