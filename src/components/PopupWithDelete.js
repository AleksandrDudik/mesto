import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonDelete = this._popup.querySelector('.popup__button-delete');
    this._buttonSubmit = this._popup.querySelector('.popup__button');
  }

  setHandleSubmit(foo) {
    this._handleSubmit = foo;
  }

  _handleLoading(message) {
    this._buttonSubmit.textContent = message;
  }

  setEventListeners() {
    this._buttonDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleLoading('Удаление..');
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  open() {
    super.open();
    this._handleLoading('Да');
  }
}