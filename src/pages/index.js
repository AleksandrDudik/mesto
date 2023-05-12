import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import {configuration} from "../utils/constants.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
      authorization: 'f044fe90-0b5c-4930-9def-569136b06e9a',
      'Content-Type': 'application/json',
  },
});

const nameGet = document.querySelector('.profile__name');
const jobGet = document.querySelector('.profile__profession');
const avatarGet = document.querySelector('.profile__avatar');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupUserButton = document.querySelector('.profile__button_actions_add');
const infoButton = document.querySelector('.profile__button_actions_edit');
const avatarButton = document.querySelector('.profile__button_actions_avatar');
const popupCardAdd = document.querySelector('.popup_card_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const avatarInput = document.querySelector('.popup__input_type_avatar');
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupEditAvatar = document.querySelector('.popup_edit_avatar');
const popupConfirmDelete = document.querySelector('.popup_confirm_delete');
const cardsContainer = '.card';
const cardTemplateSelector = '#cards-add';

const profileFormValidator = new FormValidator(configuration, popupEditProfile);
const cardFormValidator = new FormValidator(configuration, popupCardAdd);
const avatarFormValidator = new FormValidator(configuration, popupEditAvatar);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const inputValues = new UserInfo({selectorUserName: nameGet, selectorUserJob: jobGet, selectorUserAvatar: avatarGet});

let userId = null;

function createCard(item) {
  const card = new Card(item, cardTemplateSelector, {
    handleCardClick: (clickedItem) => {popupOpenFoto.open(clickedItem);},
    handleConfirmDelete: () => {
      confirmDeleteCard.open();
      confirmDeleteCard.setHandleSubmit(function() {
          api.deleteCard(card._data._id)
              .then(() => {
                  card.handleDeleteCard();
                  confirmDeleteCard.close();
              })
              .catch((err) => console.log(err))
      });
    },
    setLike: (data) => {
      api.setLike(data._id)
          .then((data) => {
              card.likeCount(data);
          })
          .catch((err) => {
              console.log(err);
          })
    },
    removeLike: (data) => {
      api.deleteLike(data._id)
          .then((data) => {
              card.likeCount(data);
          })
          .catch((err) => {
              console.log(err);
          })
    }
  }, userId);
  return card; 
};

const defaultCardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    const newCard = card.generateCard();
    defaultCardList.addItem(newCard);
  },
}, cardsContainer);

const popupAddFoto = new PopupWithForm({popupSelector: popupCardAdd,  
  handleFormSubmit: (newData) => {
    api.postCards(newData)
    .then((data) => {
      const card = createCard(data);
      const newCardElement = card.generateCard();
      defaultCardList.addItem(newCardElement);
      popupAddFoto.close();
    })
    .catch((err) => console.log(err))
  }
});
popupAddFoto.setEventListeners();

const popupOpenProfile = new PopupWithForm({popupSelector: popupEditProfile,  
  handleFormSubmit: (newData) => {
    api.setApiUserInfo(newData)
    .then((data) => {
      inputValues.setUserInfo(data);
      popupOpenProfile.close();
    })
    .catch((err) => console.log(err))
  }
});
popupOpenProfile.setEventListeners();

const popupOpenAvatar = new PopupWithForm({popupSelector: popupEditAvatar,  
  handleFormSubmit: (newData) => {
    api.setAvatar(newData)
    .then((data) => {
      inputValues.setUserAvatar(data);
      popupOpenAvatar.close();
    })
    .catch((err) => console.log(err))
  }
});
popupOpenAvatar.setEventListeners();

const popupOpenFoto = new PopupWithImage(popupCardPhoto);
popupOpenFoto.setEventListeners();

const confirmDeleteCard = new PopupWithDelete(popupConfirmDelete);
confirmDeleteCard.setEventListeners();

function openFormAddPhoto() {
  cardFormValidator.toggleButtonState();
  popupAddFoto.open();
};

function openEditProfilePopup() {
  popupOpenProfile.open();
  const inputList = inputValues.getUserInfo();
  nameInput.value = inputList.name;
  jobInput.value = inputList.about;
};

function openEditAvatarPopup() {
  avatarFormValidator.toggleButtonState();
  popupOpenAvatar.open();
  avatarInput.value = '';
};

popupUserButton.addEventListener('click', openFormAddPhoto);
infoButton.addEventListener('click', openEditProfilePopup);
avatarButton.addEventListener('click', openEditAvatarPopup);

Promise.all([api.getCards(), api.getApiUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        defaultCardList.renderItems(cards);
        inputValues.setUserInfo(userData);
    })
    .catch((err) => console.log(err));