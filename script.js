// =================== THEME TOGGLE (PERSIST) ===================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  root.classList.add('light');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  themeToggle.innerHTML = root.classList.contains('light')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

// =================== PARTICLES BACKGROUND ===================
particlesJS('particles-js', {
  particles: {
    number: { value: 85, density: { enable: true, value_area: 900 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 2.6, random: true },
    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2.2, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
    modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// =================== YOUR ORIGINAL TYPING EFFECT ===================
const textEl = document.querySelector('.typing .text');
const phrases = ['Frontend Developer', 'UI Designer', 'Freelancer'];
let i = 0, j = 0, isDeleting = false;

function typeLoop() {
  if (!textEl) return;

  const currentPhrase = phrases[i];
  textEl.textContent = currentPhrase.substring(0, j);

  if (!isDeleting && j < currentPhrase.length) {
    j++;
    setTimeout(typeLoop, 100); // typing speed
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(typeLoop, 50); // deleting speed
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeLoop, 900); // pause before deleting
    } else {
      isDeleting = false;
      i = (i + 1) % phrases.length; // next phrase
      setTimeout(typeLoop, 500); // pause before typing next
    }
  }
}
typeLoop();

// =================== CERTIFICATES ANIMATION ===================
gsap.utils.toArray('.certificate-card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  });
});

// =================== PROJECT FILTERS ===================
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    cards.forEach(card => {
      const cat = card.dataset.category;
      card.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
    });
  });
});

// =================== CONTACT FORM HANDLING ===================
// =================== CONTACT FORM (Formspree) ===================
const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('form-message');
const waBtn = document.getElementById('whatsappBtn');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[0-9]{10}$/.test(phone);

  if (!name || !emailOk || !phoneOk || !subject || !message) {
    contactMsg.textContent = 'Please fill all fields correctly (valid email & 10-digit mobile).';
    contactMsg.style.color = '#ff6b6b';
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  // Dynamic WhatsApp link
  const waText = encodeURIComponent(`Hi Vishal, I'm ${name}. Subject: ${subject}. ${message} (Mobile: ${phone})`);
  waBtn?.setAttribute('href', `https://wa.me/919876543210?text=${waText}`);

  // Formspree submission
  const formData = new FormData(contactForm);

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    const data = await res.json();

    if (res.ok) {
      contactMsg.textContent = '✅ Thanks! Your message has been sent successfully.';
      contactMsg.style.color = '#70e000';
      contactForm.reset();
    } else {
      contactMsg.textContent = '❌ Error sending email. Please try again.';
      contactMsg.style.color = '#ff6b6b';
    }

  } catch (err) {
    contactMsg.textContent = '❌ Could not connect to server.';
    contactMsg.style.color = '#ff6b6b';
  }

  if (btn) {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }, 3000);
  }
});


// =================== MARKSHEET FORM (Formspree) ===================
const marksheetForm = document.getElementById('marksheet-form');
const marksheetMsg = document.getElementById('marksheet-msg');

marksheetForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const semester = document.getElementById('semester').value;
  const year = document.getElementById('year').value;
  const message = document.getElementById('message').value.trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[0-9]{10}$/.test(phone);

  if (!name || !emailOk || !phoneOk || !semester || !year || !message) {
    marksheetMsg.textContent = 'Please fill all fields correctly.';
    marksheetMsg.style.color = '#ff6b6b';
    return;
  }

  const btn = marksheetForm.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  const formData = new FormData(marksheetForm);

  try {
    const res = await fetch(marksheetForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      marksheetMsg.textContent = '✅ Your request has been submitted successfully!';
      marksheetMsg.style.color = '#70e000';
      marksheetForm.reset();
    } else {
      marksheetMsg.textContent = '❌ Error sending request. Please try again.';
      marksheetMsg.style.color = '#ff6b6b';
    }
  } catch (err) {
    marksheetMsg.textContent = '❌ Could not connect to server.';
    marksheetMsg.style.color = '#ff6b6b';
  }

  if (btn) {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Request';
    }, 3000);
  }
});


// =================== DYNAMIC WHATSAPP LINK UPDATE ===================
['name', 'subject', 'message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', updateWA);
});
function updateWA() {
  const name = (document.getElementById('name')?.value || '').trim();
  const subject = (document.getElementById('subject')?.value || '').trim();
  const message = (document.getElementById('message')?.value || '').trim();
  const text = encodeURIComponent(`Hi Vishal, I'm ${name}. Subject: ${subject}. ${message}`);
  waBtn?.setAttribute('href', `https://wa.me/919876543210?text=${text}`);
}

// =================== BACK TO TOP BUTTON ===================
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) { toTop?.classList.add('show'); } else { toTop?.classList.remove('show'); }
});

// =================== CV DOWNLOAD ALERT ===================
const downloadBtn = document.querySelector('.btn.ghost');
downloadBtn?.addEventListener('click', (e) => {
  alert("✅ Your CV download has started!");
});
