const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");
const navbar = document.getElementById("navbar");

// This function closes navbar if user clicks anywhere outside of navbar once it's opened
// Does not leave unused event listeners on
// It's messy, but it works
function closeNavbar(e) {
  if (
    document.body.classList.contains("show-nav") &&
    e.target !== toggle &&
    !toggle.contains(e.target) &&
    e.target !== navbar &&
    !navbar.contains(e.target)
  ) {
    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    document.body.removeEventListener("click", closeNavbar);
  }
}

// Toggle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

// Show modal
open.addEventListener("click", () => {
  resetFormUI();
  modal.classList.add("show-modal");
});

// Hide modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false,
);

const navLinks = document.querySelectorAll("nav ul li a");

console.log(navLinks);

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // remove active class from all links
    navLinks.forEach((item) => item.classList.remove("active"));

    // add active class to clicked link
    this.classList.add("active");
  });
});

const form = document.querySelector(".modal-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");

const inputs = [nameInput, emailInput, passwordInput, password2Input];

// Submit validation
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = checkInputs();

 if (!isValid) return;

  showSuccessMessage();
  }
);

function showSuccessMessage(){

  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.textContent = "Account created successfully!";

  form.prepend(successMessage);

  // reset form inputs
  form.reset();

  // remove success borders
  inputs.forEach(input=>{
    input.classList.remove("success","error");
  });

  // close modal after delay
  setTimeout(()=>{
    modalclose();
    successMessage.remove();
  },2000);
}

function modalclose() {
  document.getElementById("modal").classList.remove("show-modal");
}

function resetFormUI() {
  form.reset();

  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.classList.remove("success", "error");
  });

  const errors = form.querySelectorAll("small");
  errors.forEach((error) => error.remove());

  // RESET PASSWORD STRENGTH BAR
  strengthBar.style.width = "0%";
}

// Real-time validation
inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

function checkInputs() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const password2Value = password2Input.value.trim();

  if (nameValue === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  if (emailValue === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, "Invalid email format");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (passwordValue === "") {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  if (password2Value === "") {
    showError(password2Input, "Confirm your password");
    isValid = false;
  } else if (passwordValue !== password2Value) {
    showError(password2Input, "Passwords do not match");
    isValid = false;
  } else {
    showSuccess(password2Input);
  }

  return isValid;
}

function showError(input, message) {
  const formControl = input.parentElement;

  let small = formControl.querySelector("small");

  if (!small) {
    small = document.createElement("small");
    formControl.appendChild(small);
  }

  small.textContent = message;
  small.className = "error-message";

  input.classList.remove("success");
  input.classList.add("error");
}

function showSuccess(input) {
  const formControl = input.parentElement;

  const small = formControl.querySelector("small");

  if (small) {
    small.remove();
  }

  input.classList.remove("error");
  input.classList.add("success");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const strengthBar = document.getElementById("strength-bar");

passwordInput.addEventListener("input", updateStrength);

function updateStrength() {
  const value = passwordInput.value;
  let strength = 0;

  if (value.length > 5) strength++;
  if (value.match(/[A-Z]/)) strength++;
  if (value.match(/[0-9]/)) strength++;
  if (value.match(/[^A-Za-z0-9]/)) strength++;

  switch (strength) {
    case 0:
      strengthBar.style.width = "0%";
      break;

    case 1:
      strengthBar.style.width = "25%";
      strengthBar.style.background = "red";
      break;

    case 2:
      strengthBar.style.width = "50%";
      strengthBar.style.background = "orange";
      break;

    case 3:
      strengthBar.style.width = "75%";
      strengthBar.style.background = "yellowgreen";
      break;

    case 4:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "green";
      break;
  }
}

setTimeout(() => {
  modalclose();
  resetFormUI();
}, 2000);
