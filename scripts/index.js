import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards, configuration} from "./constants.js";

const popupEditForm = document.querySelector('.popup__form');
const popupEditFormAddCard = document.querySelector('.popup__form_add');
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
const popuphandleOpenImagePopup = document.querySelector('.popup__zoom-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const popupButtonClosePhoto = document.querySelector('.popup__close_photo');
const popupButtonCloseCard = document.querySelector('.popup__close_new-card');
const cardsContainer = document.querySelector('.card');
const popups = document.querySelectorAll('.popup');
const cardTemplateSelector = '#cards-add';

const profileFormValidator = new FormValidator(configuration, popupEditProfile);
const cardFormValidator = new FormValidator(configuration, popupCardAdd);

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
      city: popupInputCity.value,
      link: popupInputLink.value,
      handleOpenImagePopup: handleOpenImagePopup,
    });
    closePopup(popupCardAdd);
    evt.target.reset();
};

const createCard = (cardData) => {
  const cards = new Card(cardData, cardTemplateSelector);
  const newCard = cards.generateCard(cardData);
  return newCard;
}

const renderCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));
};

function openPopup(element) {
  document.addEventListener('keydown', handleClosePopupByEsc);
  element.classList.add('popup_opened');
};

const handleOpenImagePopup = (data) => {
  openPopup(popupCardPhoto);
  popuphandleOpenImagePopup.src = data._link;
  popuphandleOpenImagePopup.alt = data._name;
  popupTitleCard.textContent = data._name;
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleClosePopupByEsc);
  popup.classList.remove('popup_opened');
};

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = nameGet.textContent;
  jobInput.value = jobGet.textContent;
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

function openFormAddPhoto() {
  cardFormValidator.toggleButtonState();
  openPopup(popupCardAdd);
};

function closePopupViewPhoto() {
  closePopup(popupCardPhoto);
};

function closePopupAddPhoto() {
  closePopup(popupCardAdd);
};

initialCards.forEach((cardData) => {
  const data = {
    city: cardData.city,
    link: cardData.link,
    handleOpenImagePopup: handleOpenImagePopup,
  }
  renderCard(data);
});

function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);
  }
}

popupEditForm.addEventListener('submit', handleProfileFormSubmit);
popupEditFormAddCard.addEventListener('submit', handleCardFormSubmit);
popupUserButton.addEventListener('click', openFormAddPhoto);
infoButton.addEventListener('click', openEditProfilePopup);
popupButtonClosePhoto.addEventListener('click', closePopupViewPhoto);
popupButtonCloseCard.addEventListener('click', closePopupAddPhoto);
popupCloseProfile.addEventListener('click', closePopupFormEdit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup(popup);
  })
);