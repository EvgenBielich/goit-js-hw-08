import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const LS_FORM_KEY = 'feedback-form-state';

initForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.target.elements;

  if (email.value === '' || message.value.trim() === '') {
    alert('Please fill in all the fields!');
  } else {
    const currentData = {};
    const formData = new FormData(form);
    formData.forEach((value, name) => (currentData[name] = value));
    console.log(currentData);
    localStorage.removeItem(LS_FORM_KEY);
    e.currentTarget.reset();
  }
}

function onFormInput(e) {
  let currentData = localStorage.getItem(LS_FORM_KEY);
  currentData = currentData ? JSON.parse(currentData) : {};
  currentData[e.target.name] = e.target.value;
  localStorage.setItem(LS_FORM_KEY, JSON.stringify(currentData));
}

function initForm() {
  let formData;
  try {
    formData = JSON.parse(localStorage.getItem(LS_FORM_KEY));
  } catch (error) {
    console.log(error.name, error.message);
  }
  if (formData) {
    Object.entries(formData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
