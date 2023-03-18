const popupEditForm = document.querySelector('.popup__form');
const popupEditForms = document.querySelector('.popup__forms');
const nameGet = document.querySelector('.profile__name');
const jobGet = document.querySelector('.profile__profession');
const closeButtonProfile = document.querySelector('.popup__close_profile');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupUserButton = document.querySelector('.profile__button_actions_add');
const infoButton = document.querySelector('.profile__button_actions_edit');
const popupCardAdd = document.querySelector('.popup_card_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupInputCity = document.querySelector('.popup__input_type_title');
const popupInputLink = document.querySelector('.popup__input_type_link');
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupImageCard = document.querySelector('.popup__zoom-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const popupButtonClosePhoto = document.querySelector('.popup__close_photo');
const popupButtonCloseCard = document.querySelector('.popup__close_new-card');
const elementsTemplate = document.querySelector('#cards-add').content.querySelector('.card__item');
const elementsList = document.querySelector('.card');
const popups = document.querySelectorAll('.popup');

const generateElementList = (cardData) => {
  const templateElements = elementsTemplate.cloneNode(true);
  const titleNewElements = templateElements.querySelector('.card__city');
  const likeElements = templateElements.querySelector('.card__like');
  const elementsDelete = templateElements.querySelector('.card__delete');
  const elementsImgCard = templateElements.querySelector('.card__image');
  elementsImgCard.src = cardData.link;
  elementsImgCard.alt = cardData.city;
  titleNewElements.textContent = cardData.city;

  function imageCard(){
    popupImageCard.src = elementsImgCard.src;
    popupImageCard.alt = titleNewElements.textContent;
    popupTitleCard.textContent = titleNewElements.textContent;
    openPopup(popupCardPhoto);
  }

  elementsImgCard.addEventListener('click', imageCard);
  elementsDelete.addEventListener('click', deleteCard);
  likeElements.addEventListener('click', like);
  return templateElements;
};

const like = (evt) =>{
  evt.target.classList.toggle('card__like_active');
};

const submitAddCard = (evt) => {
    evt.preventDefault();
    renderElements({
      city: popupInputCity.value,
      link: popupInputLink.value,
    });
    evt.target.reset();
    closePopup(popupCardAdd);
};

const deleteCard = (evt) => {
  evt.target.closest('.card__item').remove();
};

const renderElements = (cardData) => {
  elementsList.prepend(generateElementList(cardData));
};

function openPopup(element){
  document.addEventListener('keydown', PressEscKey);
  element.classList.add('popup_opened');
};

function closePopup(popup){
  document.removeEventListener('keydown', PressEscKey);
  popup.classList.remove('popup_opened');
};

function editOpenForm(){
  openPopup(popupEditProfile);
  nameInput.value = nameGet.textContent;
  jobInput.value = jobGet.textContent;
};

function closePopupFormEdit(){
  closePopup(popupEditProfile);
};

function submitEdit(evt){
  evt.preventDefault();
  nameGet.textContent = `${nameInput.value}`;
  jobGet.textContent = `${jobInput.value}`;
  closePopupFormEdit();
};

function openFormAddPhoto(){
  openPopup(popupCardAdd);
};

function closePopupViewPhoto(){
  closePopup(popupCardPhoto);
};

function closePopupAddPhoto(){
  closePopup(popupCardAdd);
};

initialCards.forEach((cardData) => {
  renderElements(cardData);
});

function PressEscKey(evt){
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);
  }
}

popupEditForm.addEventListener('submit', submitEdit);
popupEditForms.addEventListener('submit', submitAddCard);
popupUserButton.addEventListener('click', openFormAddPhoto);
infoButton.addEventListener('click', editOpenForm);
popupButtonClosePhoto.addEventListener('click', closePopupViewPhoto);
popupButtonCloseCard.addEventListener('click', closePopupAddPhoto);
closeButtonProfile.addEventListener('click', closePopupFormEdit);

popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') 
    ) {
      closePopup(popup);
    }
  })
);