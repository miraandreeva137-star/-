
// ===============================
// 1. МУЗЫКАЛЬНЫЙ ПЛЕЕР
// ===============================

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = '♫ Выключить музыку';
    } catch (error) {
      console.error('Не удалось включить музыку:', error);
    }
  } else {
    music.pause();
    musicBtn.textContent = '♫ Включить музыку';
  }
});


// ===============================
// 2. ОБРАТНЫЙ ОТСЧЁТ
// ===============================

// Дата свадьбы: 20 июня 2027 года
const weddingDate = new Date('2027-06-20T15:00:00');

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  const values = {
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  if (difference > 0) {
    values.days = String(
      Math.floor(difference / 86400000)
    ).padStart(3, '0');

    values.hours = String(
      Math.floor(difference / 3600000) % 24
    ).padStart(2, '0');

    values.minutes = String(
      Math.floor(difference / 60000) % 60
    ).padStart(2, '0');

    values.seconds = String(
      Math.floor(difference / 1000) % 60
    ).padStart(2, '0');
  }

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===============================
// 3. ФОРМА ПОДТВЕРЖДЕНИЯ RSVP
// ===============================

const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const guest = document.getElementById('guest').value;
  const attendance = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;
  const songChoice =
    document.querySelector('input[name="music"]:checked')?.value
    || 'Не выбрано';

  const song = document.getElementById('song').value;
  const message = document.getElementById('message').value;

  const response = {
    guest,
    attendance,
    guests,
    songChoice,
    song,
    message
  };

  console.log('Ответ гостя:', response);

  document.getElementById('formStatus').textContent =
    'Спасибо за ваш ответ! ♡';

  rsvpForm.reset();
});


// ===============================
// 4. ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ
// ===============================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
  observer.observe(section);
});

// ===== ПАДАЮЩИЕ ЛЕПЕСТКИ =====

function createPetal() {
  const petal = document.createElement('div');

  petal.className = 'petal';
  petal.textContent = Math.random() > 0.5 ? '✿' : '❀';

  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (12 + Math.random() * 14) + 'px';
  petal.style.animationDuration = (7 + Math.random() * 7) + 's';

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 15000);
}

// Не перегружаем телефон
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(createPetal, 1800);
}

// ===== ПОЯВЛЕНИЕ ПРИ ПРОКРУТКЕ =====

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});
