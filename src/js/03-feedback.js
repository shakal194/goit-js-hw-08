import throttle from 'lodash.throttle';
const STORAGE_SAVE = 'feedback-form-state';

const formData = {};

const form = document.querySelector('.feedback-form');

onFormSaved();

function onFormSaved() {
  const saveStorageMessage = localStorage.getItem(STORAGE_SAVE);

  if (saveStorageMessage) {
    const { email, message } = JSON.parse(saveStorageMessage);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
    console.log(saveStorageMessage);
  }
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem(STORAGE_SAVE, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  if (localStorage.getItem(STORAGE_SAVE) == null) {
    alert('Заполните поля');
    console.log('Заполните поля');
  }
  console.log(localStorage.getItem(STORAGE_SAVE));
  localStorage.removeItem(STORAGE_SAVE);
  event.currentTarget.reset();
}
