import "./index.css";

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import {initialCards, configuration} from "../utils/constants.css";

const popupEditFormProfile = document.querySelector('.popup__form_edit');
const popupEditFormAddCard = document.querySelector('.popup__form_add');
const nameGet = document.querySelector('.profile__name');
const jobGet = document.querySelector('.profile__profession');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupUserButton = document.querySelector('.profile__button_actions_add');
const infoButton = document.querySelector('.profile__button_actions_edit');
const popupCardAdd = document.querySelector('.popup_card_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupCardPhoto = document.querySelector('.popup_photo_card');
const cardsContainer = document.querySelector('.card');
const cardTemplateSelector = '#cards-add';

const profileFormValidator = new FormValidator(configuration, popupEditProfile);
const cardFormValidator = new FormValidator(configuration, popupCardAdd);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

initialCards.forEach((item) => {
  const data = {
    city: item.city,
    link: item.link,
    handleCardClick: handleCardClick,
  }
  defaultCardList.renderItems();
});

const handleCardClick = (city, link) => {
  popupOpenFoto.open(city, link);
}

const popupAddFoto = new PopupWithForm(popupEditFormAddCard, { 
  handleCardFormSubmit: (data) => {
    defaultCardList.addItem(createCard(data, cardTemplateSelector));
    popupAddFoto.close();
  }
});
popupAddFoto.setEventListeners();

const popupOpenProfile = new PopupWithForm(popupEditFormProfile, { 
  handleProfileFormSubmit: ({name, job}) => {
    inputValues.setUserInfo({name, job});
    popupOpenProfile.close();
  }
});
popupOpenProfile.setEventListeners();

const popupOpenFoto = new PopupWithImage(popupCardPhoto);
popupOpenFoto.setEventListeners();

function createCard(item, cardTemplateSelector) {
  const card = new Card(item, cardTemplateSelector);
  const newCard = card.generateCard(item);
  return newCard;
}

const defaultCardList = new Section({
  renderer: (item) => defaultCardList.addItem(createCard(item, cardTemplateSelector))
}, cardsContainer);

const inputValues = new UserInfo({
  name: nameGet,
  job: jobGet,
});

function openFormAddPhoto() {
  cardFormValidator.toggleButtonState();
  popupAddFoto.open();
};

function openEditProfilePopup() {
  popupOpenProfile.open();
  const inputList = inputValues.getUserInfo();
  nameInput.value = inputList.name;
  jobInput.value = inputList.job;
};

popupUserButton.addEventListener('click', openFormAddPhoto);
infoButton.addEventListener('click', openEditProfilePopup);