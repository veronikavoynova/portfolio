const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".navigation");

if (menuToggle && mainNavigation) {
  const menuLinks = mainNavigation.querySelectorAll(".menu-link");
  const mobileNavigation = window.matchMedia("(max-width: 700px)");

  const closeMenu = (restoreFocus = false) => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    mainNavigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Закрыть меню");
    mainNavigation.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuLinks[0]?.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeMenu(true);
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = [menuToggle, ...menuLinks];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  mobileNavigation.addEventListener("change", () => closeMenu());
}

