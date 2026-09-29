// Petrolube Fleet & Transportation Solutions Toolkit — progressive enhancement only.
// Every page is fully readable without this file; it adds menus, tabs and filters.
(() => {
  document.documentElement.classList.add('js');
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------------------------------------------------------------- header */
  const header = document.querySelector('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Desktop dropdowns (hover opens them on pointer devices; click/keyboard handled here).
  const menus = $$('.has-menu');
  const closeMenus = (except) => menus.forEach((m) => {
    if (m === except) return;
    m.classList.remove('is-open');
    m.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
  });
  menus.forEach((m) => {
    const btn = m.querySelector('.nav-toggle');
    btn.addEventListener('click', () => {
      const open = !m.classList.contains('is-open');
      closeMenus(m);
      m.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    m.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeMenus(); btn.focus(); }
    });
    m.addEventListener('focusout', (e) => { if (!m.contains(e.relatedTarget)) closeMenus(); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.has-menu')) closeMenus(); });

  // Mobile menu
  const burger = document.querySelector('[data-burger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (burger && mobileNav) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      mobileNav.hidden = !open;
      document.body.classList.toggle('nav-open', open);
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileNav.hidden) { setOpen(false); burger.focus(); } });
    mobileNav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------------------------------------------------------------- bumper-to-bumper tabs */
  $$('[data-b2b]').forEach((stage) => {
    const tabs = $$('[role="tab"]', stage);
    const panels = $$('[role="tabpanel"]', stage);
    const spots = $$('.hotspot', stage);
    const activate = (panelId, focus = false) => {
      tabs.forEach((t) => {
        const on = t.getAttribute('aria-controls') === panelId;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
        if (on) t.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      });
      panels.forEach((p) => { p.hidden = p.id !== panelId; });
      spots.forEach((s) => {
        const on = s.dataset.target === panelId;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-pressed', String(on));
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        let next = step !== undefined ? (i + step + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
        if (next === null) return;
        e.preventDefault();
        activate(tabs[next].getAttribute('aria-controls'), true);
      });
    });
    spots.forEach((s) => s.addEventListener('click', () => activate(s.dataset.target)));
    activate(tabs[0].getAttribute('aria-controls'));
  });

  /* ---------------------------------------------------------------- OEM matrix filter */
  $$('[data-matrix-filter]').forEach((bar) => {
    const table = document.querySelector(`[data-matrix="${bar.dataset.matrixFilter}"]`);
    if (!table) return;
    const chips = $$('.chip', bar);
    chips.forEach((chip) => chip.addEventListener('click', () => {
      const oem = chip.dataset.oem;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      $$('[data-col]', table).forEach((cell) => {
        const match = oem !== 'all' && cell.dataset.col === oem;
        cell.classList.toggle('is-col', match);
        cell.classList.toggle('is-dim', oem !== 'all' && !match && cell.tagName === 'TD');
      });
      $$('tbody tr', table).forEach((tr) => {
        tr.classList.toggle('is-empty', oem !== 'all' && tr.dataset.row[Number(oem)] === '-');
      });
    }));
  });

  /* ---------------------------------------------------------------- quick OEM lookup */
  $$('[data-lookup]').forEach((ui) => {
    const chips = $$('.chip', ui);
    const panels = $$('[data-panel]', ui);
    chips.forEach((chip) => chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== chip.dataset.oem; });
    }));
  });

  /* ---------------------------------------------------------------- contact form → email */
  // There is no backend: the form composes a message for the visitor's own email app.
  $$('[data-contact-form]').forEach((form) => {
    const error = form.querySelector('.form-error');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = $$('[required]', form);
      let firstBad = null;
      required.forEach((f) => {
        const bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute('aria-invalid', String(bad));
        if (bad && !firstBad) firstBad = f;
      });
      if (firstBad) {
        error.textContent = 'Please complete your name, company and a valid work email.';
        error.hidden = false;
        firstBad.focus();
        return;
      }
      error.hidden = true;
      const d = new FormData(form);
      const services = d.getAll('services');
      const lines = [
        `Name: ${d.get('name')}`,
        `Company: ${d.get('company')}`,
        `Email: ${d.get('email')}`,
        d.get('phone') && `Phone: ${d.get('phone')}`,
        d.get('segment') && `Fleet segment: ${d.get('segment')}`,
        d.get('size') && `Fleet size: ${d.get('size')}`,
        services.length && `Services of interest: ${services.join(', ')}`,
        '',
        d.get('message') || '',
      ].filter((l) => l !== false && l !== null && l !== undefined && l !== 0);
      const subject = `Technical meeting request — ${d.get('company')}`;
      window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    });
  });
})();
