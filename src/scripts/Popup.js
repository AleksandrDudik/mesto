export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  open() {
    document.addEventListener('keydown', this._handleClosePopupByEsc);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleClosePopupByEsc);
    this._popup.classList.remove('popup_opened');
  }

  _handleClosePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      const opened = document.querySelector('.popup_opened');
      this.close(opened);
    }
  }

  _handleClosePopupOnClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', this._handleClosePopupOnClickOverlay);
  }
}