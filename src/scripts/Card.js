export default class Card {
  constructor({data, handleCardClick}, cardTemplateSelector) {
    this._city = data.city;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._template = document.querySelector(cardTemplateSelector).content;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  };

  _handleLikeClick() {
    this._likeActive.classList.toggle('card__like_active');
  };

  _setEventListeners() {
    const data = { city: this._city, link: this._link };
    this._likeActive = this._newCard.querySelector('.card__like');
    this._likeActive.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._buttonDelete = this._newCard.querySelector('.card__delete');
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._newCard.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(data);
    });
  }

  generateCard() {
    this._newCard = this._template.querySelector('.card__template').cloneNode(true);
    this._setEventListeners();

    this._titleNewElements = this._newCard.querySelector('.card__city');
    this._elementsImgCard = this._newCard.querySelector('.card__image');
    this._elementsImgCard.src = this._link;
    this._elementsImgCard.alt = this._city;
    this._titleNewElements.textContent = this._city;
    
    return this._newCard;
  };

}