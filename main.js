/* ===================================================================
   GREETS EQUIPMENT — Shared JavaScript
   Navigation, animations, interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* — Scroll-based header style — */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* — Mobile navigation — */
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* — Intersection Observer for fade-up animations — */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
    fadeObserver.observe(el);
  });

  /* — Scroll to top button — */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* — Smooth anchor scrolling — */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* — Accordion — */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      // Close siblings
      item.parentElement.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* — Product card expand — */
  document.querySelectorAll('.product-card[data-expandable]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Don't toggle if clicking a link
      const detail = card.querySelector('.product-detail');
      if (detail) {
        detail.classList.toggle('active');
        card.classList.toggle('expanded');
      }
    });
  });

  /* — Filter chips — */
  document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        // Single select within the same filter group
        bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const filter = chip.dataset.filter;
        const target = chip.dataset.target;
        if (target) {
          document.querySelectorAll(target).forEach(item => {
            if (filter === 'all' || item.dataset.brand === filter || item.dataset.process === filter || item.dataset.industry === filter) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });

  /* — Contact form mailto — */
  const contactForm = document.querySelector('#enquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || '';
      const company = data.get('company') || '';
      const email = data.get('email') || '';
      const phone = data.get('phone') || '';
      const process = data.get('process') || '';
      const city = data.get('city') || '';
      const details = data.get('details') || '';

      const subject = encodeURIComponent(`Enquiry from ${name} – ${company}`);
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nProcess: ${process}\nCity: ${city}\n\nParts, material and volumes:\n${details}`
      );
      window.location.href = `mailto:enquiry-equipment@greets.co.in?subject=${subject}&body=${body}`;
    });
  }

  /* — Search box filtering (a page may have more than one search box,
     e.g. the home page's quick finder plus its own full catalog) — */
  const searchInputs = document.querySelectorAll('.search-box input, .quick-finder__row input[name="q"]');
  const runProductFilter = (query) => {
    if (!document.querySelector('.product-card')) return;
    document.querySelectorAll('.product-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = query === '' || text.includes(query) ? '' : 'none';
    });
    document.querySelectorAll('.product-category').forEach(cat => {
      let anyVisible = false;
      cat.querySelectorAll('.product-card').forEach(c => {
        if (c.style.display !== 'none') anyVisible = true;
      });
      cat.style.display = anyVisible ? '' : 'none';
    });
  };
  if (searchInputs.length) {
    // Prefill from ?q= when arriving from the home page quick finder
    const presetQuery = new URLSearchParams(window.location.search).get('q');
    if (presetQuery) {
      searchInputs.forEach(el => { el.value = presetQuery; });
      runProductFilter(presetQuery.toLowerCase().trim());
    }
    searchInputs.forEach(searchInput => searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      runProductFilter(query);
    }));
  }

  /* — Number counter animation — */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.count;
        if (!target) return;
        
        const isDecimal = target.includes('.');
        const hasPlus = target.includes('+');
        const numStr = target.replace(/[^0-9.]/g, '');
        const num = parseFloat(numStr);
        const suffix = target.replace(/[0-9.]/g, '');
        
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();
        
        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = start + (num - start) * eased;
          
          if (isDecimal) {
            el.textContent = current.toFixed(1) + suffix;
          } else {
            el.textContent = Math.round(current).toLocaleString() + suffix;
          }
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

});
