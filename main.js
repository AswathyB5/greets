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
    // Close on link click (delegated so dynamic product links close cleanly)
    mobileNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Mobile products accordion toggle
    const prodToggle = mobileNav.querySelector('#mobile-products-toggle');
    const prodPanel = mobileNav.querySelector('#mobile-products-panel');
    if (prodToggle && prodPanel) {
      prodToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = prodPanel.classList.toggle('open');
        prodToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
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
  document.querySelectorAll('a[href^="#"]:not([href^="#/"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      const viewEl = document.getElementById('view');
      const homeEl = document.getElementById('top');

      if (viewEl && !viewEl.hidden && homeEl) {
        viewEl.hidden = true;
        homeEl.hidden = false;
        window.location.hash = hash;
      }

      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        window.location.hash = hash;
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
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

  /* — Enquiry form: Web3Forms integration — */
  const contactForm = document.querySelector('#enquiry-form');
  if (contactForm) {
    const WEB3FORMS_ACCESS_KEY = '0554f1da-4bb4-4c4e-85fe-523711ed17e6';
    const ENQUIRY_ENDPOINT = 'https://api.web3forms.com/submit';
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

    const urlParams = new URLSearchParams(window.location.search);
    const paramPage = urlParams.get('page') || urlParams.get('product') || '';
    const paramCat = urlParams.get('category') || urlParams.get('cat') || '';
    const paramBrand = urlParams.get('brand') || '';
    const paramSource = urlParams.get('source') || '';

    const elEnquiryPage = contactForm.querySelector('#enquiry_page');
    const elEnquiryCat = contactForm.querySelector('#enquiry_category');
    const elEnquiryBrand = contactForm.querySelector('#enquiry_brand');
    const elPageSource = contactForm.querySelector('#page_source');

    if (paramPage && elEnquiryPage) elEnquiryPage.value = paramPage;
    if (paramCat && elEnquiryCat) elEnquiryCat.value = paramCat;
    if (paramBrand && elEnquiryBrand) elEnquiryBrand.value = paramBrand;
    if (elPageSource) elPageSource.value = paramPage || paramCat || paramSource || '';

    const elDetails = contactForm.querySelector('#details');
    if (elDetails && paramPage && !elDetails.value.trim()) {
      elDetails.placeholder = `Enquiry for ${paramPage}. Please mention component types, materials, batch volume...`;
    }

    const elProcess = contactForm.querySelector('#process');
    if (elProcess && (paramBrand === 'Huasheng' || paramCat.toLowerCase().includes('coating') || paramPage.toLowerCase().includes('deco') || paramPage.toLowerCase().includes('coating'))) {
      elProcess.value = 'PVD / DLC / diamond coating (Huasheng)';
    } else if (elProcess && (paramBrand === 'BMI' || paramCat.toLowerCase().includes('furnace') || paramCat.toLowerCase().includes('quenching') || paramCat.toLowerCase().includes('nitriding') || paramCat.toLowerCase().includes('temperature'))) {
      elProcess.value = 'Vacuum heat treatment (BMI)';
    } else if (elProcess && (paramBrand === 'Novatec' || paramCat.toLowerCase().includes('cleaning') || paramCat.toLowerCase().includes('pluritank') || paramCat.toLowerCase().includes('2crd'))) {
      elProcess.value = 'Ultrasonic cleaning (Novatec)';
    }

    const summaryOf = (p) => [
      'Name: ' + (p.name || ''),
      'Company: ' + (p.company || 'N/A'),
      'Email: ' + (p.email || ''),
      'Phone: ' + (p.phone || 'N/A'),
      'Process: ' + (p.process || 'N/A'),
      'Enquiry Page: ' + (p.enquiry_page || p.page_source || 'Website general'),
      'Category: ' + (p.enquiry_category || 'N/A'),
      'Brand: ' + (p.enquiry_brand || 'N/A'),
      'City: ' + (p.city || 'N/A'),
      '',
      'Parts, material and volumes:',
      p.details || 'N/A'
    ].join('\n');

    /* — Confirmation Popup Modal — */
    const getOrCreateModal = () => {
      let modal = document.getElementById('confirmation-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'confirmation-modal';
        modal.className = 'greets-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'greets-modal-title');
        modal.innerHTML = `
          <div class="greets-modal-dialog">
            <div class="greets-modal-accent"></div>
            <div class="greets-modal-body">
              <button type="button" class="greets-modal-close" aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div class="greets-modal-icon-wrap">
                <div class="greets-modal-icon-pulse"></div>
                <div class="greets-modal-icon-circle">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline class="greets-modal-svg-check" points="14,25 21,32 34,17"></polyline>
                  </svg>
                </div>
              </div>

              <h3 class="greets-modal-title" id="greets-modal-title">Enquiry Received!</h3>
              <p class="greets-modal-subtitle" id="greets-modal-subtitle">
                Thank you for reaching out. Your enquiry has been received and routed to our Bangalore technical team.
              </p>

              <div class="greets-modal-sla">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>We reply within 1 working day</span>
              </div>

              <div class="greets-modal-info-box" id="greets-modal-info-box"></div>

              <div class="greets-modal-actions">
                <button type="button" class="greets-modal-btn-primary" id="greets-modal-done">
                  <span>Done</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
                <a href="index.html#/bmi" class="greets-modal-btn-secondary" id="greets-modal-catalog">
                  Browse Equipment Catalog &rarr;
                </a>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        // Bind closing actions
        const closeModal = () => {
          modal.classList.remove('active');
          document.body.classList.remove('greets-modal-open');
        };

        modal.querySelector('.greets-modal-close').addEventListener('click', closeModal);
        modal.querySelector('#greets-modal-done').addEventListener('click', closeModal);
        modal.querySelector('#greets-modal-catalog').addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
          }
        });
      }
      return modal;
    };

    const showConfirmationModal = (data) => {
      const modal = getOrCreateModal();
      const titleEl = modal.querySelector('#greets-modal-title');
      const subEl = modal.querySelector('#greets-modal-subtitle');
      const infoBox = modal.querySelector('#greets-modal-info-box');

      if (data.name) {
        titleEl.textContent = `Thank You, ${data.name}!`;
      } else {
        titleEl.textContent = 'Enquiry Received!';
      }

      subEl.textContent = `Your equipment enquiry has been sent to enquiry-equipment@greets.co.in. Our team will review your specifications and get in touch.`;

      // Build summary rows
      const rows = [];
      if (data.email) {
        rows.push(`<div class="greets-modal-info-row"><span class="greets-modal-info-label">Confirmation To:</span><span class="greets-modal-info-value">${data.email}</span></div>`);
      }
      if (data.company) {
        rows.push(`<div class="greets-modal-info-row"><span class="greets-modal-info-label">Company:</span><span class="greets-modal-info-value">${data.company}</span></div>`);
      }
      if (data.process && data.process !== 'Not sure yet') {
        rows.push(`<div class="greets-modal-info-row"><span class="greets-modal-info-label">Process / Equipment:</span><span class="greets-modal-info-value">${data.process}</span></div>`);
      }
      if (data.city) {
        rows.push(`<div class="greets-modal-info-row"><span class="greets-modal-info-label">Location:</span><span class="greets-modal-info-value">${data.city}</span></div>`);
      }

      infoBox.innerHTML = rows.join('');
      infoBox.style.display = rows.length ? 'flex' : 'none';

      // Re-trigger SVG animation cleanly by cloning node or resetting class
      const svgCheck = modal.querySelector('.greets-modal-svg-check');
      if (svgCheck) {
        svgCheck.style.animation = 'none';
        void svgCheck.offsetHeight; // trigger reflow
        svgCheck.style.animation = '';
      }

      modal.classList.add('active');
      document.body.classList.add('greets-modal-open');
    };

    const showFallback = (reason, heading) => {
      if (!statusEl) return;
      statusEl.className = 'form-status form-status--error';
      statusEl.innerHTML = '';

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

    /* — Comprehensive Form Validation & Error Display — */
    const clearError = (field) => {
      const container = field.closest('.form-field');
      if (container) {
        container.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
        const err = container.querySelector('.field-error-msg');
        if (err) err.remove();
      }
    };

    const setError = (field, message) => {
      const container = field.closest('.form-field');
      if (container) {
        clearError(field);
        container.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true');
        const err = document.createElement('span');
        err.className = 'field-error-msg';
        err.textContent = message;
        container.appendChild(err);
      }
    };

    const validateField = (field) => {
      const name = field.name || field.id;
      const val = (field.value || '').trim();

      if (name === 'name') {
        if (!val) {
          setError(field, 'Please enter your name');
          return false;
        }
        if (val.length < 2) {
          setError(field, 'Name must be at least 2 characters');
          return false;
        }
        if (!/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(val)) {
          setError(field, 'Please enter a valid name with letters');
          return false;
        }
      }

      if (name === 'company') {
        if (val && val.length < 2) {
          setError(field, 'Company name must be at least 2 characters');
          return false;
        }
      }

      if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!val) {
          setError(field, 'Please enter your email address');
          return false;
        }
        if (!emailRegex.test(val)) {
          setError(field, 'Please enter a valid email address (e.g. name@company.com)');
          return false;
        }
      }

      if (name === 'phone') {
        if (!val) {
          setError(field, 'Please enter your phone number');
          return false;
        }
        const digits = val.replace(/\D/g, '');
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{5,16}$/;
        if (digits.length < 7 || digits.length > 15 || !phoneRegex.test(val)) {
          setError(field, 'Please enter a valid phone number (7 to 15 digits)');
          return false;
        }
      }

      if (name === 'city') {
        if (val && val.length < 2) {
          setError(field, 'City name must be at least 2 characters');
          return false;
        }
      }

      if (name === 'process') {
        if (!val) {
          setError(field, 'Please select a process');
          return false;
        }
      }

      if (name === 'details') {
        if (val && val.length > 3000) {
          setError(field, 'Description cannot exceed 3,000 characters');
          return false;
        }
      }

      clearError(field);
      return true;
    };

    const validateForm = () => {
      let isValid = true;
      let firstInvalid = null;

      const fieldsToValidate = contactForm.querySelectorAll('#name, #email, #company, #phone, #process, #city, #details');
      fieldsToValidate.forEach((field) => {
        const fieldValid = validateField(field);
        if (!fieldValid) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
      }

      return isValid;
    };

    // Live validation: validate on blur, clear on input/change
    contactForm.querySelectorAll('input, select, textarea').forEach((input) => {
      if (input.name === 'website' || input.type === 'hidden') return;
      input.addEventListener('blur', () => {
        if (input.value.trim() || input.hasAttribute('required')) {
          validateField(input);
        }
      });
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('change', () => clearError(input));
    });

    let lastSubmission = '';

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const data = new FormData(contactForm);
      const get = (k) => String(data.get(k) || '').trim();
      const name = get('name');
      const company = get('company');
      const email = get('email');
      const phone = get('phone');
      const process = get('process');
      const city = get('city');
      const details = get('details');
      const enquiry_page = get('enquiry_page') || get('page_source');
      const enquiry_category = get('enquiry_category');
      const enquiry_brand = get('enquiry_brand');
      const page_source = get('page_source') || enquiry_page;

      // Honeypot: pretend it worked, show popup, but send nothing.
      const honey = contactForm.querySelector('input[name="website"]') || contactForm.querySelector('input[name="botcheck"]');
      if (honey && honey.value) {
        showConfirmationModal({ name, company, email, process, city, enquiry_page });
        contactForm.reset();
        contactForm.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
        return;
      }

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Equipment Enquiry: ${enquiry_page || process || 'General'} from ${name}${company ? ' (' + company + ')' : ''}`,
        from_name: 'Greets Equipment Website',
        replyto: email,
        name: name,
        company: company,
        email: email,
        phone: phone,
        process: process,
        city: city,
        details: details,
        enquiry_page: enquiry_page,
        enquiry_category: enquiry_category,
        enquiry_brand: enquiry_brand,
        page_source: page_source,
        message: [
          'Name: ' + name,
          'Company: ' + (company || 'N/A'),
          'Email: ' + email,
          'Phone: ' + (phone || 'N/A'),
          'Process / Equipment: ' + (process || 'N/A'),
          'Source Page / Product: ' + (enquiry_page || page_source || 'Website general'),
          'Category: ' + (enquiry_category || 'N/A'),
          'Brand: ' + (enquiry_brand || 'N/A'),
          'City: ' + (city || 'N/A'),
          '',
          'Parts, material and volumes:',
          details || 'None provided'
        ].join('\n')
      };

      lastSubmission = summaryOf(payload);

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
          body: JSON.stringify(payload)
        });

        const json = await res.json().catch(() => ({}));

        if (!res.ok || json.success === false) {
          throw new Error(json.message || ('Server answered with status ' + res.status));
        }

        // Show our popup modal matching the site design
        showConfirmationModal({ name, company, email, process, city });
        contactForm.reset();
        contactForm.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
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
  const searchInputs = document.querySelectorAll('.search-box input:not(#finder-q), .quick-finder__row input[name="q"]');
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
