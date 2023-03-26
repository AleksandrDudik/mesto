const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...last }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

const showInputError = (formElement, inputElement, { errorClass, inputErrorClass, ...last }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);   
};

const hideInputError = (formElement, inputElement, { errorClass, inputErrorClass, ...last }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, last) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, last);
  } else {
      hideInputError(formElement, inputElement, last);
    }
};

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...last}) {
  const formList = [...document.querySelectorAll(formSelector)];
  formList.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(inputSelector),  ];
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, last);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, last);
        toggleButtonState(inputList, buttonElement, last);
      });
    });
  });
}

enableValidation({formSelector: '.popup__form', inputSelector: '.popup__input', submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_disabled', inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'});