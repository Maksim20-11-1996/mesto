import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners = () => {
        this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            this.renderLoading(true)
            this.close()
        });
        super.setEventListeners();
    }

    _getInputValues() {
        this.inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this.inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        this._popupElement.querySelector('.popup__form').reset();
        super.close();
    }
}