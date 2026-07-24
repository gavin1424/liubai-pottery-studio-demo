(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const courseDialog = document.querySelector(".course-dialog");
  const demoDialog = document.querySelector(".demo-dialog");
  const bookingForm = document.querySelector(".booking-form");
  const courseSelect = document.querySelector("#course");
  const dateInput = document.querySelector("#date");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const openDialog = (dialog) => {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  const closeDialog = (dialog) => {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  };

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "開啟導覽選單");
    primaryNav.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const nextState = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(nextState));
      menuToggle.setAttribute("aria-label", nextState ? "關閉導覽選單" : "開啟導覽選單");
      primaryNav.classList.toggle("is-open", nextState);
      body.classList.toggle("menu-open", nextState);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  const dialogTitle = courseDialog?.querySelector("#course-dialog-title");
  const dialogDuration = courseDialog?.querySelector("[data-dialog-duration]");
  const dialogLevel = courseDialog?.querySelector("[data-dialog-level]");
  const dialogPrice = courseDialog?.querySelector("[data-dialog-price]");
  const dialogDetail = courseDialog?.querySelector("[data-dialog-detail]");
  const dialogReserve = courseDialog?.querySelector(".dialog-reserve");
  let selectedCourse = "";

  document.querySelectorAll(".course-card").forEach((card) => {
    const detailButton = card.querySelector(".course-detail");
    detailButton?.addEventListener("click", () => {
      selectedCourse = card.dataset.course || "";
      if (dialogTitle) dialogTitle.textContent = selectedCourse;
      if (dialogDuration) dialogDuration.textContent = card.dataset.duration || "";
      if (dialogLevel) dialogLevel.textContent = card.dataset.level || "";
      if (dialogPrice) dialogPrice.textContent = card.dataset.price || "";
      if (dialogDetail) dialogDetail.textContent = card.dataset.detail || "";
      openDialog(courseDialog);
    });
  });

  dialogReserve?.addEventListener("click", () => {
    if (courseSelect && selectedCourse) {
      courseSelect.value = selectedCourse;
      courseSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
    closeDialog(courseDialog);
    document.querySelector("#booking")?.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "start"
    });
    window.setTimeout(() => courseSelect?.focus(), reduceMotion.matches ? 0 : 450);
  });

  document.querySelectorAll("dialog .dialog-close").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });

  document.querySelector(".dialog-confirm")?.addEventListener("click", () => closeDialog(demoDialog));

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) closeDialog(dialog);
    });
  });

  document.querySelectorAll("[data-demo-contact]").forEach((button) => {
    button.addEventListener("click", () => openDialog(demoDialog));
  });

  const worksToggle = document.querySelector("[data-works-toggle]");
  const extraWork = document.querySelector(".work-extra");
  worksToggle?.addEventListener("click", () => {
    const expanded = worksToggle.getAttribute("aria-expanded") === "true";
    worksToggle.setAttribute("aria-expanded", String(!expanded));
    if (extraWork) {
      extraWork.hidden = expanded;
      if (!expanded) {
        extraWork.classList.add("is-visible");
      }
    }
    const label = expanded ? "查看所有作品" : "收起作品";
    worksToggle.childNodes[0].textContent = `${label} `;
  });

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  if (dateInput) dateInput.min = localDate;

  const fields = {
    name: {
      element: document.querySelector("#name"),
      error: document.querySelector("#name-error"),
      validate: (value) => value.trim().length >= 2,
      message: "請輸入至少 2 個字的姓名。"
    },
    phone: {
      element: document.querySelector("#phone"),
      error: document.querySelector("#phone-error"),
      validate: (value) => /^[0-9+\-\s()]{8,20}$/.test(value.trim()),
      message: "請輸入可辨識的電話格式。"
    },
    email: {
      element: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "請輸入正確的電子郵件格式。"
    },
    course: {
      element: document.querySelector("#course"),
      error: document.querySelector("#course-error"),
      validate: (value) => value.trim() !== "",
      message: "請選擇想參加的課程。"
    },
    date: {
      element: document.querySelector("#date"),
      error: document.querySelector("#date-error"),
      validate: (value) => value !== "" && value >= localDate,
      message: "請選擇今天以後的日期。"
    },
    guests: {
      element: document.querySelector("#guests"),
      error: document.querySelector("#guests-error"),
      validate: (value) => value !== "",
      message: "請選擇參加人數。"
    }
  };

  const setFieldState = (config, isValid) => {
    if (!config.element || !config.error) return;
    config.element.setAttribute("aria-invalid", String(!isValid));
    config.element.setAttribute("aria-describedby", config.error.id);
    config.error.textContent = isValid ? "" : config.message;
  };

  const validateField = (config) => {
    if (!config.element) return true;
    const isValid = config.validate(config.element.value);
    setFieldState(config, isValid);
    return isValid;
  };

  Object.values(fields).forEach((config) => {
    config.element?.addEventListener("blur", () => validateField(config));
    config.element?.addEventListener("input", () => {
      if (config.element.getAttribute("aria-invalid") === "true") {
        validateField(config);
      }
    });
    config.element?.addEventListener("change", () => validateField(config));
  });

  const privacyCheckbox = document.querySelector("#privacy-consent");
  const privacyError = document.querySelector("#privacy-error");
  const validatePrivacy = () => {
    const isValid = Boolean(privacyCheckbox?.checked);
    privacyCheckbox?.setAttribute("aria-invalid", String(!isValid));
    privacyCheckbox?.setAttribute("aria-describedby", "privacy-error");
    if (privacyError) {
      privacyError.textContent = isValid ? "" : "送出前請勾選同意隱私權政策。";
    }
    return isValid;
  };

  privacyCheckbox?.addEventListener("change", validatePrivacy);

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fieldResults = Object.values(fields).map(validateField);
    const privacyValid = validatePrivacy();
    const allValid = fieldResults.every(Boolean) && privacyValid;

    if (!allValid) {
      const firstInvalid = bookingForm.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    const success = bookingForm.querySelector(".form-success");
    if (success) success.hidden = false;
    bookingForm.querySelector(".form-submit")?.setAttribute("disabled", "");

    window.setTimeout(() => {
      bookingForm.reset();
      if (dateInput) dateInput.min = localDate;
      Object.values(fields).forEach((config) => {
        config.element?.removeAttribute("aria-invalid");
        if (config.error) config.error.textContent = "";
      });
      privacyCheckbox?.removeAttribute("aria-invalid");
      if (privacyError) privacyError.textContent = "";
      bookingForm.querySelector(".form-submit")?.removeAttribute("disabled");
    }, 800);

    success?.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "nearest"
    });
  });

  document.querySelector(".back-to-top")?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.matches ? "auto" : "smooth"
    });
  });
})();
