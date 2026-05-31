/**
 * Vanilla JS — no external libraries
 */
(function () {
  "use strict";

  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  document.querySelectorAll("#navmenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.remove();
    });
  }

  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    function toggleScrollTop() {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
    scrollTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  document.querySelectorAll("[data-aos], .fade-in").forEach(function (el) {
    el.classList.add("fade-in");
  });

  document.querySelectorAll(".fade-in").forEach(function (el) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  });

  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const strings = (typedEl.getAttribute("data-typed-items") || typedEl.textContent).split(",");
    let stringIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = strings[stringIndex].trim();
      typedEl.textContent = deleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

      if (!deleting) charIndex++;
      else charIndex--;

      if (!deleting && charIndex === current.length + 1) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      if (deleting && charIndex === 0) {
        deleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
      }
      setTimeout(type, deleting ? 50 : 100);
    }
    typedEl.textContent = "";
    type();
  }

  document.querySelectorAll(".lightbox").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const overlay = document.createElement("div");
      overlay.className = "lightbox-overlay active";
      overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<img src="' + link.getAttribute("href") + '" alt="' + (link.getAttribute("title") || "") + '">';
      document.body.appendChild(overlay);
      overlay.querySelector(".lightbox-close").addEventListener("click", function () {
        overlay.remove();
      });
      overlay.addEventListener("click", function (ev) {
        if (ev.target === overlay) overlay.remove();
      });
    });
  });

  document.querySelectorAll(".isotope-layout").forEach(function (layout) {
    const items = layout.querySelectorAll(".isotope-item");
    layout.querySelectorAll(".isotope-filters li").forEach(function (filter) {
      filter.addEventListener("click", function () {
        layout.querySelector(".filter-active").classList.remove("filter-active");
        filter.classList.add("filter-active");
        const selector = filter.getAttribute("data-filter");
        items.forEach(function (item) {
          if (selector === "*" || item.matches(selector)) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  });

  document.querySelectorAll(".testimonials-carousel").forEach(function (carousel) {
    const track = carousel.querySelector(".testimonials-track");
    const slides = carousel.querySelectorAll(".testimonial-item");
    const pagination = carousel.querySelector(".carousel-pagination");
    if (!track || !slides.length) return;

    let index = 0;
    let perView = window.innerWidth >= 1200 ? 3 : 1;
    const maxIndex = Math.max(0, slides.length - perView);

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        index = Math.min(i, maxIndex);
        update();
      });
      pagination.appendChild(dot);
    });

    function update() {
      track.style.transform = "translateX(-" + (index * (100 / perView)) + "%)";
      pagination.querySelectorAll("button").forEach(function (btn, i) {
        btn.classList.toggle("active", i === index);
      });
    }

    setInterval(function () {
      index = index >= maxIndex ? 0 : index + 1;
      update();
    }, 5000);

    window.addEventListener("resize", function () {
      perView = window.innerWidth >= 1200 ? 3 : 1;
      update();
    });
  });

  document.querySelectorAll(".portfolio-slider").forEach(function (slider) {
    const track = slider.querySelector(".portfolio-slider-track");
    const slides = slider.querySelectorAll(".slide");
    const pagination = slider.querySelector(".carousel-pagination");
    if (!track || !slides.length) return;

    let index = 0;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        index = i;
        update();
      });
      pagination.appendChild(dot);
    });

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      pagination.querySelectorAll("button").forEach(function (btn, i) {
        btn.classList.toggle("active", i === index);
      });
    }

    setInterval(function () {
      index = (index + 1) % slides.length;
      update();
    }, 5000);
  });

  document.querySelectorAll(".skills-animation .progress-bar").forEach(function (bar) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            bar.style.width = bar.getAttribute("aria-valuenow") + "%";
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.8 }
    );
    observer.observe(bar.closest(".skills-animation") || bar);
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const subject = contactForm.querySelector('[name="subject"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      const sent = contactForm.querySelector(".sent-message");

      if (!name || !email || !subject || !message) {
        const err = contactForm.querySelector(".error-message");
        if (err) {
          err.textContent = "Please fill in all fields.";
          err.classList.add("show");
        }
        return;
      }

      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href =
        "mailto:mulirokhaemba@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;

      if (sent) sent.classList.add("show");
      contactForm.reset();
    });
  }

  window.addEventListener("load", function () {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(function () {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop, 10),
          behavior: "smooth",
        });
      }, 100);
    }
  });

  const navLinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navLinks.forEach(function (link) {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach(function (l) {
          l.classList.remove("active");
        });
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
