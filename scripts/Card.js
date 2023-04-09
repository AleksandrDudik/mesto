export default class Card {
  constructor(data, cardTemplateSelector) {
    this._city = data.city;
    this._link = data.link;
    this._template = cardTemplateSelector;
  }

  generateCard(data) {
    const templateElements = this._template.cloneNode(true);
    const titleNewElements = templateElements.querySelector('.card__city');
    const likeElements = templateElements.querySelector('.card__like');
    const elementsDelete = templateElements.querySelector('.card__delete');
    const elementsImgCard = templateElements.querySelector('.card__image');
    elementsImgCard.src = this._link;
    elementsImgCard.alt = this._city;
    titleNewElements.textContent = this._city;

    function handleOpenImagePopup() {
      const popupCardPhoto = document.querySelector('.popup_photo_card');
      const popuphandleOpenImagePopup = document.querySelector('.popup__zoom-card');
      const popupTitleCard = document.querySelector('.popup__title-card');
      popuphandleOpenImagePopup.src = elementsImgCard.src;
      popuphandleOpenImagePopup.alt = titleNewElements.textContent;
      popupTitleCard.textContent = titleNewElements.textContent;
      popupCardPhoto.classList.add('popup_opened');;
    }

    elementsImgCard.addEventListener('click', handleOpenImagePopup);
    elementsDelete.addEventListener('click', this._deleteCard);
    likeElements.addEventListener('click', this._handleLikeClick);
    return templateElements;
  };

  _deleteCard(evt) {
    evt.target.closest('.card__template').remove();
  };

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  };
}