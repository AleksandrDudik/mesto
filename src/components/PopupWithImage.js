import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__zoom-card');
    this._cityCard = this._popup.querySelector('.popup__title-card');
  }

  open(data) {
    super.open();
    this._imgCard.src = data.link;
    this._imgCard.alt = data.city;
    this._cityCard.textContent = data.city;
  }
};