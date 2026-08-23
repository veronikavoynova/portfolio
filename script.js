const conceptLightbox = document.querySelector(".concept-lightbox");

if (conceptLightbox) {
  const dialog = conceptLightbox.querySelector(".concept-lightbox-dialog");
  const closeButton = conceptLightbox.querySelector(".concept-lightbox-close");
  const title = conceptLightbox.querySelector(".concept-lightbox-title");
  const description = conceptLightbox.querySelector(".concept-lightbox-description");
  const visuals = conceptLightbox.querySelector(".concept-lightbox-visuals");
  const triggers = document.querySelectorAll(".concept-card-trigger");
  let activeTrigger = null;

  const createFigure = (src, alt, label = "") => {
    const figure = document.createElement("figure");
    figure.className = "concept-lightbox-figure";

    if (label) {
      const caption = document.createElement("figcaption");
      caption.className = "concept-lightbox-label";
      caption.textContent = label;
      figure.append(caption);
    }

    const image = document.createElement("img");
    image.className = "concept-lightbox-image";
    image.src = src;
    image.alt = alt;
    figure.append(image);

    return figure;
  };

  const openLightbox = (trigger) => {
    const {
      title: conceptTitle,
      description: conceptDescription,
      image,
      imageAlt,
      imageBefore,
      imageAfter,
    } = trigger.dataset;

    activeTrigger = trigger;
    title.textContent = conceptTitle;
    description.textContent = conceptDescription;
    visuals.replaceChildren();
    visuals.classList.toggle("is-comparison", Boolean(imageBefore && imageAfter));

    if (imageBefore && imageAfter) {
      visuals.append(
        createFigure(imageBefore, `${imageAlt} — до`, "До"),
        createFigure(imageAfter, `${imageAlt} — после`, "После"),
      );
    } else {
      const singleImage = image || imageAfter || imageBefore;

      if (singleImage) {
        visuals.append(createFigure(singleImage, imageAlt));
      }
    }

    conceptLightbox.hidden = false;
    document.body.classList.add("concept-lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    conceptLightbox.hidden = true;
    document.body.classList.remove("concept-lightbox-open");
    visuals.replaceChildren();
    activeTrigger?.focus();
    activeTrigger = null;
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  closeButton.addEventListener("click", closeLightbox);

  conceptLightbox.addEventListener("click", (event) => {
    if (event.target === conceptLightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (conceptLightbox.hidden) {
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

const experienceItems = document.querySelectorAll(".experience-item");

if (experienceItems.length) {
  const mobileExperience = window.matchMedia("(max-width: 700px)");

  const setExperienceState = (item, isOpen, animate = true) => {
    const trigger = item.querySelector(".experience-trigger");
    const panel = item.querySelector(".experience-panel");
    const icon = item.querySelector(".experience-icon");

    trigger.setAttribute("aria-expanded", String(isOpen));
    item.classList.toggle("is-open", isOpen);
    icon.textContent = isOpen ? "−" : "+";

    if (!animate) {
      panel.hidden = !isOpen;
      panel.style.height = isOpen ? "auto" : "0px";
      return;
    }

    if (isOpen) {
      panel.hidden = false;
      panel.style.height = "0px";

      requestAnimationFrame(() => {
        panel.style.height = `${panel.scrollHeight}px`;
      });
    } else {
      panel.style.height = `${panel.scrollHeight}px`;
      panel.offsetHeight;

      requestAnimationFrame(() => {
        panel.style.height = "0px";
      });
    }

    panel.addEventListener("transitionend", () => {
      const remainsOpen = trigger.getAttribute("aria-expanded") === "true";
      panel.hidden = !remainsOpen;
      panel.style.height = remainsOpen ? "auto" : "0px";
    }, { once: true });
  };

  const setInitialExperienceState = () => {
    const shouldOpenFirst = !mobileExperience.matches;

    experienceItems.forEach((item, index) => {
      setExperienceState(item, shouldOpenFirst && index === 0, false);
    });
  };

  experienceItems.forEach((item) => {
    const trigger = item.querySelector(".experience-trigger");

    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";

      experienceItems.forEach((otherItem) => {
        const otherTrigger = otherItem.querySelector(".experience-trigger");
        const otherIsOpen = otherTrigger.getAttribute("aria-expanded") === "true";

        if (otherItem === item) {
          setExperienceState(otherItem, willOpen);
        } else if (otherIsOpen) {
          setExperienceState(otherItem, false);
        }
      });
    });
  });

  setInitialExperienceState();
  mobileExperience.addEventListener("change", setInitialExperienceState);
}
