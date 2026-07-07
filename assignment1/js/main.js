/**
 * Main JavaScript file for the portfolio site.
 * Handles: mobile navigation, project slideshow, contact form validation.
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  function initNavigation() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Close menu when a nav link is clicked on mobile */
    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }
  }

  /* --------------------------------------------------------------------------
     Project Slideshow (Projects.html)
     -------------------------------------------------------------------------- */
  function initSlideshow() {
    var container = document.getElementById("projectcontainer");
    if (!container) return;

    var slides = container.querySelectorAll(".project-card");
    var prevBtn = document.getElementById("prev-btn");
    var nextBtn = document.getElementById("next-btn");
    var indicator = document.getElementById("slide-indicator");
    var currentIndex = 0;
    var totalSlides = slides.length;

    function showSlide(index) {
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }
      slides[index].classList.add("active");
      currentIndex = index;

      if (indicator) {
        indicator.textContent = (index + 1) + " / " + totalSlides;
      }

      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
          showSlide(currentIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (currentIndex < totalSlides - 1) {
          showSlide(currentIndex + 1);
        }
      });
    }

    showSlide(0);
  }

  /* --------------------------------------------------------------------------
     Contact Form Validation (Contact.html)
     -------------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var subjectInput = document.getElementById("subject");
    var messageInput = document.getElementById("message");
    var successMsg = document.getElementById("form-success");

    var SUBJECT_MIN = 5;
    var SUBJECT_MAX = 100;
    var MESSAGE_MIN = 20;
    var MESSAGE_MAX = 1000;

    function setError(groupId, errorId, message) {
      var group = document.getElementById(groupId);
      var errorEl = document.getElementById(errorId);
      if (group) group.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(groupId, errorId) {
      var group = document.getElementById(groupId);
      var errorEl = document.getElementById(errorId);
      if (group) group.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }

    function validateName() {
      var value = nameInput.value.trim();
      if (value === "") {
        setError("name-group", "name-error", "Name is required and cannot be empty.");
        return false;
      }
      clearError("name-group", "name-error");
      return true;
    }

    function validateEmail() {
      var value = emailInput.value.trim();
      if (value === "") {
        setError("email-group", "email-error", "Email address is required.");
        return false;
      }
      if (!emailInput.validity.valid) {
        setError("email-group", "email-error", "Please enter a valid email address.");
        return false;
      }
      clearError("email-group", "email-error");
      return true;
    }

    function validateSubject() {
      var value = subjectInput.value.trim();
      if (value.length < SUBJECT_MIN) {
        setError("subject-group", "subject-error", "Subject must be at least " + SUBJECT_MIN + " characters.");
        return false;
      }
      if (value.length > SUBJECT_MAX) {
        setError("subject-group", "subject-error", "Subject must not exceed " + SUBJECT_MAX + " characters.");
        return false;
      }
      clearError("subject-group", "subject-error");
      return true;
    }

    function validateMessage() {
      var value = messageInput.value.trim();
      if (value.length < MESSAGE_MIN) {
        setError("message-group", "message-error", "Message must be at least " + MESSAGE_MIN + " characters.");
        return false;
      }
      if (value.length > MESSAGE_MAX) {
        setError("message-group", "message-error", "Message must not exceed " + MESSAGE_MAX + " characters.");
        return false;
      }
      clearError("message-group", "message-error");
      return true;
    }

    /* Real-time validation on blur */
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    subjectInput.addEventListener("blur", validateSubject);
    messageInput.addEventListener("blur", validateMessage);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (successMsg) successMsg.classList.remove("visible");

      var isValid = validateName() && validateEmail() && validateSubject() && validateMessage();

      if (isValid) {
        if (successMsg) successMsg.classList.add("visible");
        form.reset();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Initialize all modules on DOM ready
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initSlideshow();
    initContactForm();
  });

})();
