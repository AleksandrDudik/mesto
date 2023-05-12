import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonDelete = this._popup.querySelector('.popup__button-delete');
  }

  setHandleSubmit(foo) {
    this._handleSubmit = foo;
  }

  setEventListeners() {
    this._buttonDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.handleLoading('Удаление..');
      this._handleSubmit();
      this.close();
    });
    super.setEventListeners();
  }

  open() {
    super.open();
    this.handleLoading('Да');
  }
}