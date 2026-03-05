const form = document.querySelector('#form');
const inputs = {
  username: document.querySelector('#username'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  password2: document.querySelector('#password2')
};

function setError(input, message) {
  const control = input.parentElement;
  control.classList.remove('success');
  control.classList.add('error');
  control.querySelector('small').textContent = message;
}

function setSuccess(input) {
  const control = input.parentElement;
  control.classList.remove('error');
  control.classList.add('success');
}

function validateRequired(fields) {
  let hasError = false;

  fields.forEach(field => {
    if (!field.value.trim()) {
      setError(field, `${capitalize(field.id)} is required`);
      hasError = true;
    } else {
      setSuccess(field);
    }
  });

  return hasError;
}

function validateLength(input, min, max) {
  const value = input.value.length;

  if (value < min) {
    setError(input, `${capitalize(input.id)} must be at least ${min} characters`);
  } else if (value > max) {
    setError(input, `${capitalize(input.id)} must be less than ${max} characters`);
  } else {
    setSuccess(input);
  }
}

function validateEmail(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(input.value.trim())) {
    setError(input, 'Email is not valid');
  } else {
    setSuccess(input);
  }
}

function validatePasswordMatch(p1, p2) {
  if (p1.value !== p2.value) {
    setError(p2, 'Passwords do not match');
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const requiredError = validateRequired(Object.values(inputs));

  if (!requiredError) {
    validateLength(inputs.username, 3, 15);
    validateLength(inputs.password, 6, 25);
    validateEmail(inputs.email);
    validatePasswordMatch(inputs.password, inputs.password2);
  }
});