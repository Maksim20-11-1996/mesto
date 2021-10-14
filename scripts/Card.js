import { openPopup } from "./index.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

    _removeCardsHandler() {
        this._element.closest('.card').remove();
    }

    _openImagePopup() {
        const popupOpenImage = document.querySelector('#popup_open-image');
        popupOpenImage.querySelector('.popup__image-picture').src = this._link;
        popupOpenImage.querySelector('.popup__image-name').textContent = this._name;
        popupOpenImage.querySelector('.popup__image-picture').alt = this._name;
        openPopup(popupOpenImage);
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._element.querySelector('.card__heading').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this._removeCardsHandler());
        this._element.querySelector('.card__like-button').addEventListener('click', function(event) {
            event.target.classList.toggle('card__like-button_active');
        });
        this._image.addEventListener('click', () => this._openImagePopup());
        return this._element;
    }
}