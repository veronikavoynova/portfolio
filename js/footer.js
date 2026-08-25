(() => {
  const mount = document.querySelector("[data-site-footer]");

  if (!mount) {
    return;
  }

  mount.outerHTML = `
    <footer class="site-footer">
      <div class="container site-footer-content">
        <p>© 2026 Вероника Войнова</p>
        <p>Сайт спроектирован и сверстан мной</p>
      </div>
    </footer>`;
})();
