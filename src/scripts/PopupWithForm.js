import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector,  handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  _getInputValues() {   
    const inputsValues = {};
    this._inputsList.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((input, i) => {
      input.value = Object.values(data)[i];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEvtHandler);
  }
}