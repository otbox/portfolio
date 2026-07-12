
function switchLanguage(language) {
  const imagem1 = '/assets/brasil.png';
  const imagem2 = '/assets/reino-unido.png';
  const image = document.getElementById('language');

  if (!image) {
    return;
  }

  const ptElements = document.getElementsByClassName('pt');
  const enElements = document.getElementsByClassName('en');

  if (language === 'pt') {
    image.src = imagem1;
    for (let i = 0; i < ptElements.length; i += 1) {
      ptElements[i].style.display = 'block';
    }
    for (let i = 0; i < enElements.length; i += 1) {
      enElements[i].style.display = 'none';
    }
  } else {
    image.src = imagem2;
    for (let i = 0; i < ptElements.length; i += 1) {
      ptElements[i].style.display = 'none';
    }
    for (let i = 0; i < enElements.length; i += 1) {
      enElements[i].style.display = 'block';
    }
  }
}

function detectLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  switchLanguage(userLang.startsWith('pt') ? 'pt' : 'en');
}

function navigate(page) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach((a) => a.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
  }
  const activeLink = document.querySelector(`.nav-links a[onclick="navigate('${page}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.getElementById('navLinks')?.classList.remove('open');
}

function toggleMenu() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

function toggleSaibaMais(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains('open');
  content.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.setAttribute('aria-hidden', String(isOpen));
}

const phrases = ['Full-Stack Developer', 'React & Next.js', 'TypeScript Enjoyer', 'Docker Sailor', 'ADS @ Unicamp'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById('typewriter');

function type() {
  if (!el) {
    return;
  }

  const current = phrases[phraseIndex];
  const displayed = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  el.innerHTML = displayed + '<span class="cursor-blink">_</span>';
  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();

window.addEventListener('load', detectLanguage);
