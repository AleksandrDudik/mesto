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
const popuphandleOpenImagePopup = document.querySelector('.popup__zoom-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const popupButtonClosePhoto = document.querySelector('.popup__close_photo');
const popupButtonCloseCard = document.querySelector('.popup__close_new-card');
const elementsTemplate = document.querySelector('#cards-add').content.querySelector('.card__template');
const cardsContainer = document.querySelector('.card');
const popups = document.querySelectorAll('.popup');
const inactive = document.getElementById('inactive');

const generateCard = (cardData) => {
  const templateElements = elementsTemplate.cloneNode(true);
  const titleNewElements = templateElements.querySelector('.card__city');
  const likeElements = templateElements.querySelector('.card__like');
  const elementsDelete = templateElements.querySelector('.card__delete');
  const elementsImgCard = templateElements.querySelector('.card__image');
  elementsImgCard.src = cardData.link;
  elementsImgCard.alt = cardData.city;
  titleNewElements.textContent = cardData.city;

  function handleOpenImagePopup() {
    popuphandleOpenImagePopup.src = elementsImgCard.src;
    popuphandleOpenImagePopup.alt = titleNewElements.textContent;
    popupTitleCard.textContent = titleNewElements.textContent;
    openPopup(popupCardPhoto);
  }

  elementsImgCard.addEventListener('click', handleOpenImagePopup);
  elementsDelete.addEventListener('click', deleteCard);
  likeElements.addEventListener('click', handleLikeClick);
  return templateElements;
};

const handleLikeClick = (evt) => {
  evt.target.classList.toggle('card__like_active');
};

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
      city: popupInputCity.value,
      link: popupInputLink.value,
    });
    closePopup(popupCardAdd);
    evt.target.reset();
};

const deleteCard = (evt) => {
  evt.target.closest('.card__template').remove();
};

const renderCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
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

function buttonDisabled() {
  inactive.classList.add('popup__button_disabled');
  inactive.disabled = true;
}

function openFormAddPhoto() {
  openPopup(popupCardAdd);
  buttonDisabled();
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