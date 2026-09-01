(() => {
  const mount = document.querySelector("[data-site-header]");

  if (!mount) return;

  const root = mount.dataset.root || "./";

  mount.outerHTML = `
    <header class="header">
      <div class="container header-container">
        <a href="${root}" class="logo">Вероника Войнова</a>
        <nav class="navigation" aria-label="Внешние ссылки и настройки">
          <ul>
            <li>
              <a href="${root}assets/documents/veronika-voynova-resume.pdf" class="menu-link resume-link" download aria-label="Скачать резюме Вероники Войновой">
                Резюме
                <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10"/></svg>
              </a>
            </li>
            <li><a href="https://t.me/veronika_voynova" class="menu-link" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><button class="theme-toggle" type="button" aria-label="Включить тёмную тему" aria-pressed="false"><span class="theme-toggle-track" aria-hidden="true"><span></span></span></button></li>
          </ul>
        </nav>
      </div>
    </header>`;
})();
