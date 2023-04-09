import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    city: 'Дедовск',
    link: './images/dedovsk.jpg'
  },
  {
    city: 'Истра',
    link: './images/istra.jpg'
  },
  {
    city: 'Москва',
    link: './images/moscow.jpg'
  },
  {
    city: 'Нахабино',
    link: './images/nakhabino.jpg'
  },
  {
    city: 'Екатеринбург',
    link: './images/ekaterinburg.jpg'
  },
  {
    city: 'Зеленоград',
    link: './images/zelenograd.jpg'
  }
];

const popupEditForm = document.querySelector('.popup__form');
const popupEditForms = document.querySelector('.popup__forms');
const nameGet = document.querySelector('.profile__name');
const jobGet = document.querySelector('.profile__profession');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupUserButton = document.querySelector('.profile__button_actions_add');
const infoButton = document.querySelector('.profile__button_actions_edit');
const popupCardAdd = document.querySelector('.popup_card_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupInputCity = document.querySelector('.popup__input_type_city');
const popupInputLink = document.querySelector('.popup__input_type_link');
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupButtonClosePhoto = document.querySelector('.popup__close_photo');
const popupButtonCloseCard = document.querySelector('.popup__close_new-card');
const cardTemplate = document.querySelector('#cards-add').content.querySelector('.card__template');
const cardsContainer = document.querySelector('.card');
const popups = document.querySelectorAll('.popup');
const cardFormSubmitButton = document.getElementById('inactive');

const configuration = {inputSelector: '.popup__input', submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_disabled', inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'};
const profileFormValidator = new FormValidator(configuration, popupEditProfile);
const cardFormValidator = new FormValidator(configuration, popupCardAdd);

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
      city: popupInputCity.value,
      link: popupInputLink.value,
    });
    closePopup(popupCardAdd);
    evt.target.reset();
};

const createCard = (cardData) => {
  const cards = new Card(cardData, cardTemplate);
  const elementList = cards.generateCard(cardData);
  return elementList;
}

const renderCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));
};

function openPopup(element) {
  document.addEventListener('keydown', handleClosePopupByEsc);
  element.classList.add('popup_opened');
};

function closePopup(popup) {
  document.removeEventListener('keydown', handleClosePopupByEsc);
  popup.classList.remove('popup_opened');
};

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = nameGet.textContent;
  jobInput.value = jobGet.textContent;
  profileFormValidator.enableValidation();
};

function closePopupFormEdit() {
  closePopup(popupEditProfile);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameGet.textContent = nameInput.value;
  jobGet.textContent = jobInput.value;
  closePopupFormEdit();
};

function disableCardFormSubmitButton() {
  cardFormSubmitButton.classList.add('popup__button_disabled');
  cardFormSubmitButton.disabled = true;
}

function openFormAddPhoto() {
  openPopup(popupCardAdd);
  disableCardFormSubmitButton();
  cardFormValidator.enableValidation();
};

function closePopupViewPhoto() {
  closePopup(popupCardPhoto);
};

function closePopupAddPhoto() {
  closePopup(popupCardAdd);
};

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);
  }
}

popupEditForm.addEventListener('submit', handleProfileFormSubmit);
popupEditForms.addEventListener('submit', handleCardFormSubmit);
popupUserButton.addEventListener('click', openFormAddPhoto);
infoButton.addEventListener('click', openEditProfilePopup);
popupButtonClosePhoto.addEventListener('click', closePopupViewPhoto);
popupButtonCloseCard.addEventListener('click', closePopupAddPhoto);
popupCloseProfile.addEventListener('click', closePopupFormEdit);

popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup(popup);
  })
);