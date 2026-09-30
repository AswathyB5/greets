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

  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, .bounce-in, .stagger-children, .stagger-children--xl').forEach(el => {
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

  /* — Enquiry form: posts to a form-to-email relay — */
  const contactForm = document.querySelector('#enquiry-form');
  if (contactForm) {
    // The enquiry is posted to a form-to-email relay, which runs on someone
    // else's server and emails it to the destination in the URL. The visitor's
    // browser is not involved beyond the POST, so this works on a phone with no
    // mail client configured, which a mailto: link cannot do.
    //
    // The destination is the company address already published in the contact
    // sidebar and footer, so nothing new is exposed in the page source.
    //
    // Left empty on purpose if you would rather not use a relay: the form then
    // falls back to handing the enquiry to the visitor's mail app.
    const ENQUIRY_ENDPOINT = 'https://formsubmit.co/ajax/enquiry-equipment@greets.co.in';
    const OFFICE_EMAIL = 'enquiry-equipment@greets.co.in';
    const OFFICE_PHONE = '+918000000000';
    const statusEl = document.querySelector('#enquiry-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnLabel = submitBtn && submitBtn.querySelector('.btn-label');

    const setStatus = (message, kind) => {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = 'form-status form-status--' + kind;
      statusEl.hidden = false;
    };

    const summaryOf = (p) => [
      'Name: ' + p.name,
      'Company: ' + p.company,
      'Email: ' + p.email,
      'Phone: ' + p.phone,
      'Process: ' + p.process,
      'City: ' + p.city,
      '',
      'Parts, material and volumes:',
      p.details
    ].join('\n');

    // The enquiry must never be lost, so the details the visitor typed are
    // always shown back to them as copyable text, with the office email and
    // phone offered as a way through.
    const showFallback = (reason, heading) => {
      if (!statusEl) return;
      statusEl.className = 'form-status form-status--error';

      const intro = document.createElement('div');
      intro.textContent = heading;
      statusEl.appendChild(intro);

      const copy = document.createElement('pre');
      copy.className = 'form-status__data';
      copy.textContent = lastSubmission;
      statusEl.appendChild(copy);

      const actions = document.createElement('div');
      actions.className = 'form-status__actions';

      const mail = document.createElement('a');
      mail.href = 'mailto:' + OFFICE_EMAIL;
      mail.textContent = 'Email the office';
      actions.appendChild(mail);

      const call = document.createElement('a');
      call.href = 'tel:' + OFFICE_PHONE;
      call.textContent = 'Call the office';
      actions.appendChild(call);

      if (ENQUIRY_ENDPOINT) {
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'form-status__retry';
        retry.textContent = 'Try sending again';
        retry.addEventListener('click', () => contactForm.requestSubmit());
        actions.appendChild(retry);
      }

      statusEl.appendChild(actions);
      statusEl.hidden = false;
      if (reason) console.warn('[enquiry] send failed:', reason);
    };

    let lastSubmission = '';

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Native validation first, so the browser marks the empty and malformed
      // fields before anything is sent.
      if (!contactForm.reportValidity()) return;

      // Honeypot: pretend it worked, but send nothing.
      const honey = contactForm.querySelector('input[name="website"]');
      if (honey && honey.value) {
        setStatus('Thanks — your enquiry has been sent. We reply within one working day.', 'ok');
        contactForm.reset();
        return;
      }

      const data = new FormData(contactForm);
      const get = (k) => String(data.get(k) || '').trim();
      const name = get('name');

      const payload = {
        name: name,
        company: get('company'),
        email: get('email'),
        phone: get('phone'),
        process: get('process'),
        city: get('city'),
        details: get('details')
      };

      lastSubmission = summaryOf(payload);

      // No relay configured: hand the enquiry to the visitor's mail app and
      // keep their details on screen in case they do not send it.
      if (!ENQUIRY_ENDPOINT) {
        showFallback(
          null,
          'Your email app should now be open with the enquiry ready to send to ' + OFFICE_EMAIL + '. ' +
          'If it did not open, the details are below — please copy them and email or call us.'
        );
        const subject = encodeURIComponent('Website enquiry' + (name ? ' from ' + name : ''));
        window.location.href = 'mailto:' + OFFICE_EMAIL + '?subject=' + subject +
          '&body=' + encodeURIComponent(lastSubmission);
        return;
      }

      contactForm.setAttribute('data-busy', '');
      if (btnLabel) btnLabel.textContent = 'Sending…';
      if (statusEl) statusEl.hidden = true;

      try {
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(Object.assign({}, payload, {
            _subject: 'Website enquiry' + (name ? ' from ' + name : ''),
            _template: 'table',
            // Replied-to goes to the visitor so a reply from the mailbox reaches them.
            _replyto: payload.email
          }))
        });

        if (!res.ok) {
          throw new Error('the form relay answered ' + res.status);
        }

        setStatus(
          'Thanks' + (name ? ', ' + name : '') + ' — your enquiry has reached our Bangalore office. ' +
          'We reply within one working day.',
          'ok'
        );
        contactForm.reset();
      } catch (err) {
        showFallback(
          err && err.message ? err.message : 'network error',
          'We could not send that automatically. Your details are below — please copy them, ' +
          'email them to ' + OFFICE_EMAIL + ', or call the Bangalore office.'
        );
      } finally {
        contactForm.removeAttribute('data-busy');
        if (btnLabel) btnLabel.textContent = 'Send enquiry';
      }
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
