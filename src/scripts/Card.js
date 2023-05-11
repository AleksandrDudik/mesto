export default class Card {
  constructor(data, cardTemplateSelector, {handleCardClick, handleConfirmDelete, setLike, removeLike}, userId) {
    this._data = data;
    this._city = data.city;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleCardClick = handleCardClick;
    this._template = document.querySelector(cardTemplateSelector).content;
    this._userId = userId;
  }

  handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  };

  _handleLikeClick() {
    this._likeActive.classList.toggle('card__like_active');
  };

  _dislike(data) {
    this._handleLikeClick();
    this._removeLike(data);
  }

  _like(data) {
    this._handleLikeClick();
    this._setLike(data);
  }

  likeCount(data) {
    this._newCard.querySelector('.card__like_count').textContent = data.likes.length;
  }

  _setEventListeners() {
    const data = { city: this._city, link: this._link, likes: this._likes };
    this._likeActive = this._newCard.querySelector('.card__like');
    this._likeActive.addEventListener('click', () => {
      if (this._likeActive.classList.contains('card__like_active')) {
        this._dislike(this._data);
      } else {
        this._like(this._data);
      }
    });
    this._buttonDelete = this._newCard.querySelector('.card__delete');
    this._buttonDelete.addEventListener('click', () => {
      this._handleConfirmDelete();
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
    this._newCard.querySelector('.card__like_count').textContent = this._likes.length;

    if (!(this._ownerId === this._userId)) {
      this._buttonDelete.style.display = 'none';
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._newCard.querySelector('.card__like').classList.add('card__like_active')
    }
    
    return this._newCard;
  };

}