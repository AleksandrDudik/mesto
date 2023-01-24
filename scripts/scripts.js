const popup = document.querySelector ('.popup');
const buttonClose = document.querySelector ('.popup__button_actions_exit');
const changeForm = document.querySelector ('.popup__container');
const buttonEdit = document.querySelector ('.profile__button_actions_edit');
const nameGet = document.querySelector ('.profile__name');
const jobGet = document.querySelector ('.profile__profession');
let nameInput = changeForm.querySelector ('.popup__input_type_name');
let jobInput =  changeForm.querySelector ('.popup__input_type_job');

function openPopup () {
  popup.classList.add ('popup_opened');
  nameInput.value = nameGet.textContent;
  jobInput.value = jobGet.textContent;
}

function closePopup ()  {
  popup.classList.remove ('popup_opened');
}

function formSubmit (evt) {
    evt.preventDefault();
    nameGet.textContent = `${nameInput.value}`;
    jobGet.textContent = `${jobInput.value}`;
    closePopup ();
}

changeForm.addEventListener('submit', formSubmit);
buttonEdit.addEventListener ('click', openPopup);
buttonClose.addEventListener ('click', closePopup);
