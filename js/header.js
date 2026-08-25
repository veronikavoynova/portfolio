(() => {
  const mount = document.querySelector("[data-site-header]");

  if (!mount) {
    return;
  }

  const root = mount.dataset.root || "./";
  const isResumePage = mount.dataset.page === "resume";
  const resumeCurrent = isResumePage ? ' aria-current="page"' : "";

  mount.outerHTML = `
    <header class="header">
      <div class="container header-container">
        <a href="${root}" class="logo">Вероника Войнова</a>
        <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-navigation">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
        <nav class="navigation" id="main-navigation" aria-label="Основная навигация">
          <ul>
            <li><a href="${root}#projects" class="menu-link">Кейсы</a></li>
            <li><a href="${root}#concepts" class="menu-link">Концепты</a></li>
            <li><a href="${root}#experience" class="menu-link">Опыт</a></li>
            <li><a href="${root}#about" class="menu-link">Обо мне</a></li>
            <li><a href="${root}#contact" class="menu-link">Связаться со мной</a></li>
            <li><a href="${root}resume/" class="menu-link"${resumeCurrent}>Резюме</a></li>
          </ul>
        </nav>
      </div>
    </header>`;
})();
