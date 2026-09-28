
document.addEventListener('DOMContentLoaded', () => {
  iniciaBanner();              // liga o carrossel do banner
  iniciaCarrossel();            // liga os carrosséis de palestras/oficinas
  iniciaSwiperPalestrantes();   // liga o "um por vez" dos palestrantes
  iniciaMobileMenu();           // liga o botão hambúrguer e o painel #mobile_menu
  iniciaScrollspy();             // liga o destaque do item ativo no menu
  iniciaFormValidacao();       // liga a validação do formulário de contato
  iniciaContador();             // liga o contador regressivo
  iniciaRevelarOnScroll();        // liga o efeito de "aparecer suavemente" ao rolar
  iniciaVirarCard(); 
  iniciaVoltarAoTopo();
});



/* BANNER ROTATIVO */
function iniciaBanner() {
  const areaSlides = document.getElementById('bannerSlides');
  const areaIndicadores = document.getElementById('bannerIndicadores');
  const anteriorBtn = document.getElementById('bannerAnterior');
  const proximoBtn = document.getElementById('bannerProximo');

  if (!areaSlides) return;

  const slides = Array.from(areaSlides.querySelectorAll('.banner_slide'));

  let atual = 0;           
  let tempAutomatico = null; 

  slides.forEach((_, index) => {
    const indicador = document.createElement('button');
    indicador.setAttribute('aria-label', `Ir para o slide ${index + 1}`);

    if (index === 0) indicador.classList.add('ativo'); 
    indicador.addEventListener('click', () => irParaSlide(index));

    areaIndicadores.appendChild(indicador); 
  });

  const dots = Array.from(areaIndicadores.children);

  function irParaSlide(index) {
    slides[atual].classList.remove('ativo');
    dots[atual].classList.remove('ativo');

    atual = (index + slides.length) % slides.length;

    slides[atual].classList.add('ativo');
    dots[atual].classList.add('ativo');
  }

  function proximoSlide() { irParaSlide(atual + 1); }
  function anteriorSlide() { irParaSlide(atual - 1); }

  function iniciarRotacao() {
    pararRotacao(); 
    tempAutomatico = setInterval(proximoSlide, 7000);
  }

  function pararRotacao() {
    if (tempAutomatico) clearInterval(tempAutomatico); 
  }

  proximoBtn.addEventListener('click', () => { proximoSlide(); iniciarRotacao(); });
  anteriorBtn.addEventListener('click', () => { anteriorSlide(); iniciarRotacao(); });

  areaSlides.addEventListener('focusin', pararRotacao);
  areaSlides.addEventListener('focusout',iniciarRotacao);

  iniciarRotacao(); 
}


/* CARROSSÉIS HORIZONTAIS (Palestras / Oficinas */
function iniciaCarrossel() {
  const carrosseis = document.querySelectorAll('.carossel');

  carrosseis.forEach((carousel) => {

    const trilha = carousel.querySelector('.carossel_trilha');
    const anteriorBtn = carousel.querySelector('[data-carossel-anterior]');
    const proximoBtn = carousel.querySelector('[data-carossel-proximo]');

    if (!trilha) return;

    const rolagem = () => (trilha.querySelector('.card')?.offsetWidth || 280) + 20;

    anteriorBtn?.addEventListener('click', () => {
     
      trilha.scrollBy({ left: -rolagem(), behavior: 'smooth' });
    });

    proximoBtn?.addEventListener('click', () => {
      trilha.scrollBy({ left: rolagem(), behavior: 'smooth' });
    });
  });
}


/* SWIPER DE PALESTRANTES  */
function iniciaSwiperPalestrantes() {
  const swiper = document.getElementById('swiperPalestrantes');
  const areaProgresso = document.getElementById('swiperProgresso');

  if (!swiper) return;

  const slides = Array.from(swiper.querySelectorAll('.swiper_slide'));
  const anteriorBtn = swiper.querySelector('.swiper_seta-anterior');
  const proximoBtn = swiper.querySelector('.swiper_seta-proximo');
  let atual = 0;

  slides.forEach((_, index) => {
    const segmento = document.createElement('div');
    segmento.classList.add('segmento');
    if (index === 0) segmento.classList.add('ativo');
    segmento.addEventListener('click', () => irPara(index)); 
    areaProgresso.appendChild(segmento);
  });

  const segmentos = Array.from(areaProgresso.children);

  function irPara(index) {
    slides[atual].classList.remove('ativo');
    segmentos[atual].classList.remove('ativo');
    atual = (index + slides.length) % slides.length; 
    slides[atual].classList.add('ativo');
    segmentos[atual].classList.add('ativo');
  }

  anteriorBtn?.addEventListener('click', () => irPara(atual - 1));
  proximoBtn?.addEventListener('click', () => irPara(atual + 1));
}


/* MENU MOBILE (botão hambúrguer) */
function iniciaMobileMenu() {
  const alternar = document.getElementById('mobile-btn'); 
  const menu = document.getElementById('mobile_menu');   

  if (!alternar || !menu) return;

  alternar.addEventListener('click', () => {

    const aberto = menu.classList.toggle('aberto');
    alternar.setAttribute('aria-expanded', String(aberto));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('aberto');
      alternar.setAttribute('aria-expanded', 'false');
    });
  });
}


/*  SCROLL */
function iniciaScrollspy() {
 
  const navLinks = document.querySelectorAll('[data-nav]');

  const secao = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!secao.length) return;

  const observar = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return; 

        const id = `#${entry.target.id}`; 
        navLinks.forEach((link) => {
          link.parentElement.classList.toggle('ativo', link.getAttribute('href') === id);
        });
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
    }
  );

  // manda o observer "vigiar" cada seção
  secao.forEach((section) => observar.observe(section));
}


/* VALIDAÇÃO DO FORMULÁRIO DE CONTATO/FEEDBACK */
function iniciaFormValidacao() {
  const form = document.getElementById('formContato');
  if (!form) return;

  const successoMenssagem = document.getElementById('formSuccesso');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    limparErros(form); 

    let valido = true; 

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const assunto = form.assunto.value;
    const mensagem = form.mensagem.value.trim();

    if (nome.length < 2) {
      exibirErro(form, 'nome', 'Informe seu nome completo.');
      valido = false;
    }

    if (!emailValido(email)) {
      exibirErro(form, 'email', 'Informe um e-mail válido.');
      valido = false;
    }

    if (!assunto) {
      exibirErro(form, 'assunto', 'Selecione um assunto.');
      valido = false;
    }

    if (mensagem.length < 10) {
      exibirErro(form, 'mensagem', 'Escreva uma mensagem com pelo menos 10 caracteres.');
      valido = false;
    }

    if (!valido) return;
    successoMenssagem.hidden = false; 
    form.reset();
  });
}

function emailValido(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function exibirErro(form, fieldName, message) {
  const erroEx = form.querySelector(`[data-erro-for="${fieldName}"]`);
  if (erroEx) erroEx.textContent = message;
}

function limparErros(form) {
  form.querySelectorAll('.form_erro').forEach((el) => { el.textContent = ''; });
  document.getElementById('formSuccesso').hidden = true;
}


/* CONTADOR REGRESSIVO   */
function iniciaContador() {
  const elemento = document.getElementById('contador');
  if (!elemento) return;

  const eventoData = new Date('2026-11-10T09:00:00-03:00').getTime();

  const diasEl = document.getElementById('cd-dias');
  const horasEl = document.getElementById('cd-horas');
  const minEl = document.getElementById('cd-min');
  const segEl = document.getElementById('cd-seg');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const agora = Date.now(); 
    const diferenca = eventoData - agora; 

    if (diferenca <= 0) {
      diasEl.textContent = horasEl.textContent = minEl.textContent = segEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diferenca / (1000 * 60)) % 60);
    const seg = Math.floor((diferenca / 1000) % 60);

    diasEl.textContent = pad(dias);
    horasEl.textContent = pad(horas);
    minEl.textContent = pad(min);
    segEl.textContent = pad(seg);
  }

  tick(); 
  const timer = setInterval(tick, 1000); 
}



function iniciaRevelarOnScroll() {
  const elementos = document.querySelectorAll('.revelar');
  if (!elementos.length) return;

  const observar = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible'); 
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elementos.forEach((target) => observar.observe(target));
}

function iniciaVirarCard() {
  const cards = document.querySelectorAll('.card-virar');

  cards.forEach((card) => {
    const verso = card.querySelector('.card_verso');

    function toggleFlip() {
      const virado = card.classList.toggle('virado');
      card.setAttribute('aria-expanded', String(virado));

    
      if (verso) verso.setAttribute('aria-hidden', String(!virado));
    }

    if (verso) verso.setAttribute('aria-hidden', 'true');

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      toggleFlip();
    });

    // alternativa por teclado: Enter ou Espaço fazem o mesmo que o clique
    card.addEventListener('keydown', (event) => {
      if (event.target.closest('a, button')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFlip();
      }
    });
  });
}

/* FOOTER */
function iniciaVoltarAoTopo(){
  const btn = document.getElementById('voltarAoTopo');
  if(!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  })
}
