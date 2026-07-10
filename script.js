    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Nav scroll state
    const nav = document.getElementById('siteNav');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 40);
      backToTop.classList.toggle('show', y > 600);
    }, { passive:true });

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });

    // Back to top
    backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15 });
    revealEls.forEach(el => io.observe(el));

    // Active nav link on scroll
    const sections = ['about','school-life','achievements','gallery','campus','admissions']
      .map(id => document.getElementById(id)).filter(Boolean);
    const navAnchors = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = navAnchors.find(a => a.getAttribute('href') === '#' + id);
        if (!link) return;
        if (entry.isIntersecting){
          navAnchors.forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin:'-45% 0px -50% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src, caption){
      lightboxImg.src = src;
      lightboxImg.alt = caption || '';
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.campus-tile, .gallery-tile').forEach(tile => {
      tile.addEventListener('click', () => openLightbox(tile.dataset.full, tile.dataset.caption));
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
