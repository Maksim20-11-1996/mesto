import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners = () => {
        this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit()
            this.close()
        });
        super.setEventListeners();
    }
}