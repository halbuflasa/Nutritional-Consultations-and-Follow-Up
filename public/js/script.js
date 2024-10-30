// script.js

var overlay = document.getElementById("overlay");

// Buttons to 'switch' the page
var openSignUpButton = document.getElementById("slide-left-button");
var openSignInButton = document.getElementById("slide-right-button");

// The sidebars
var leftText = document.getElementById("sign-in");
var rightText = document.getElementById("sign-up");

// The forms
var accountForm = document.getElementById("sign-in-info");
var signinForm = document.getElementById("sign-up-info");

// Open the Sign Up page
openSignUp = () => {
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation-out");
  overlay.classList.remove("open-sign-in");
  rightText.classList.remove("overlay-text-right-animation");

  // Add classes for animations
  accountForm.classList.add("form-left-slide-out");
  rightText.classList.add("overlay-text-right-animation-out");
  overlay.classList.add("open-sign-up");
  leftText.classList.add("overlay-text-left-animation");

  // Hide the sign-in form once it is out of view
  setTimeout(function() {
    accountForm.classList.remove("form-left-slide-in");
    accountForm.style.display = "none";
    accountForm.classList.remove("form-left-slide-out");
  }, 700);

  // Display the sign-up form once the overlay begins moving right
  setTimeout(function() {
    signinForm.style.display = "flex";
    signinForm.classList.add("form-right-slide-in");
  }, 200);
};

// Open the Sign In page
openSignIn = () => {
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation");
  overlay.classList.remove("open-sign-up");
  rightText.classList.remove("overlay-text-right-animation-out");

  // Add classes for animations
  signinForm.classList.add("form-right-slide-out");
  leftText.classList.add("overlay-text-left-animation-out");
  overlay.classList.add("open-sign-in");
  rightText.classList.add("overlay-text-right-animation");

  // Hide the sign-up form once it is out of view
  setTimeout(function() {
    signinForm.classList.remove("form-right-slide-in");
    signinForm.style.display = "none";
    signinForm.classList.remove("form-right-slide-out");
  }, 700);

  // Display the sign-in form once the overlay begins moving left
  setTimeout(function() {
    accountForm.style.display = "flex";
    accountForm.classList.add("form-left-slide-in");
  }, 200);
};

// When a 'switch' button is pressed, switch page
openSignUpButton.addEventListener("click", openSignUp, false);
openSignInButton.addEventListener("click", openSignIn, false);
