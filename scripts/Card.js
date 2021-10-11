import { openPopup } from "./index.js";
import { closePopup } from "./index.js";

export class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
    }

    _getTemplate() {
        this._template = document.querySelector('#cards-template').content;
        return this._template;
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

    _createCards = () => {
        this.template = this._getTemplate();
        this._element = this._template.querySelector('.card').cloneNode(true);
        this._element.querySelector('.card__heading').textContent = this._name;
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this._removeCardsHandler());
        this._element.querySelector('.card__like-button').addEventListener('click', function(event) {
            event.target.classList.toggle('card__like-button_active');
        });
        this._element.querySelector('.card__image').addEventListener('click', () => this._openImagePopup());
        return this._element;
    }

    addCards() {
        this._section = document.querySelector('.cards');
        this._section.prepend(this._createCards());
    }

    addCardsFormHandler = () => {
        const popupAddCards = document.querySelector('.popup_add-cards');
        this._formElement = document.querySelector('#add-cards__form');
        this.addCards();
        this._formElement.reset();
        closePopup(popupAddCards);
        this._formElement.querySelector('.popup__button').classList.add('popup__button_disabled');
        this._formElement.querySelector('.popup__button').setAttribute('disabled', true);
    };
}