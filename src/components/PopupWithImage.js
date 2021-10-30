import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popupElement.querySelector('.popup__image-picture');
        this._name = this._popupElement.querySelector('.popup__image-name');
        this._popupElement = document.querySelector(popupSelector)
    }

    open(link, name) {
        this._link.src = link;
        this._name.alt = name;
        this._name.textContent = name;
        super.open();
    }
}