import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    const inputsValues = {};
    inputsList.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  setInputValues = (data) => {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    inputsList.forEach((input, i) => {
      input.value = Object.values(data)[i];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submitCalback(this._getInputValues());
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submitEvtHandler);
    super.setEventListeners();
  }
}