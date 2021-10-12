import { openPopup } from "./index.js";

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
        this._template = '#cards-template';
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._template).content;
        return cardTemplate;
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
        this._element = this._getTemplate()
            .querySelector('.card')
            .cloneNode(true);
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