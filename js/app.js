/**
 * app.js — Portfolio router & global interactions
 * Carrega páginas via fetch() de pages/*.html
 */

const PAGES = ['home', 'projects', 'about', 'academic'];

// Cache para não refazer fetch na mesma sessão
const pageCache = {};

/**
 * Carrega o HTML de pages/<name>.html e injeta no #page-container
 */
async function navigate(page) {
  if (!PAGES.includes(page)) page = 'home';

  // Atualiza links ativos na nav
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Mostra indicador de loading
  const container = document.getElementById('page-container');
  container.innerHTML = '<div class="page-loading">Carregando</div>';

  try {
    if (!pageCache[page]) {
      const res = await fetch(`pages/${page}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      pageCache[page] = await res.text();
    }
    container.innerHTML = pageCache[page];
  } catch (err) {
    container.innerHTML = `
      <div class="page-loading" style="flex-direction:column;gap:1rem;">
        <span style="color:var(--neon-magenta)">// erro ao carregar página</span>
        <button class="btn-ghost" onclick="navigate('home')">← Home</button>
      </div>`;
    console.error('[portfolio] Erro ao carregar página:', err);
    return;
  }

  // Rola para o topo e atualiza hash
  window.scrollTo({ top: 0, behavior: 'instant' });
  history.pushState({ page }, '', `#${page}`);

  // Re-inicializa scripts específicos da página carregada
  onPageLoaded(page);

  // Fecha menu mobile se estiver aberto
  document.getElementById('navLinks').classList.remove('open');
}

/**
 * Hooks chamados após o HTML de cada página ser injetado
 */
function onPageLoaded(page) {
  if (page === 'home') initTypewriter();
}

// ============================================================
// TYPEWRITER — usado na página Home
// ============================================================
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Full-Stack Developer',
    'React & Next.js',
    'TypeScript Enjoyer',
    'Docker Sailor',
    'ADS @ Unicamp',
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    const displayed = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);
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
}

// ============================================================
// SAIBA MAIS — accordion acadêmico (delegado ao document)
// ============================================================
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.saiba-mais-btn');
  if (!btn) return;
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains('open');
  content.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(!isOpen));
  content.setAttribute('aria-hidden', String(isOpen));
});

// ============================================================
// HAMBURGER MENU
// ============================================================
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ============================================================
// ROTEAMENTO INICIAL
// ============================================================
(function init() {
  const hash = location.hash.replace('#', '');
  const startPage = PAGES.includes(hash) ? hash : 'home';
  navigate(startPage);

  // Suporte ao botão Voltar/Avançar do browser
  window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    navigate(page);
  });
})();
