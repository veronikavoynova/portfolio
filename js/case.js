const caseLightbox = document.querySelector(".case-lightbox");

if (caseLightbox) {
  const dialog = caseLightbox.querySelector(".case-lightbox-dialog");
  const lightboxTitle = caseLightbox.querySelector(".case-lightbox-title");
  const lightboxImage = caseLightbox.querySelector(".case-lightbox-image");
  const closeButton = caseLightbox.querySelector(".case-lightbox-close");
  const imageTriggers = document.querySelectorAll(".case-image-trigger");
  let activeTrigger = null;

  const openLightbox = (trigger) => {
    const preview = trigger.querySelector("img");

    activeTrigger = trigger;
    lightboxImage.src = trigger.dataset.fullImage || preview.getAttribute("src");
    lightboxImage.alt = preview.alt;
    lightboxTitle.textContent = preview.alt;
    caseLightbox.hidden = false;
    document.body.classList.add("case-lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    caseLightbox.hidden = true;
    document.body.classList.remove("case-lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    activeTrigger?.focus();
    activeTrigger = null;
  };

  imageTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  closeButton.addEventListener("click", closeLightbox);

  caseLightbox.addEventListener("click", (event) => {
    if (event.target === caseLightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (caseLightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = dialog.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
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
}

const backToTopButton = document.querySelector(".case-back-to-top");

if (backToTopButton) {
  const updateBackToTopVisibility = () => {
    backToTopButton.hidden = window.scrollY < 600;
  };

  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();

  backToTopButton.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
}

