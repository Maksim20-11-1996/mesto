export class Card {
    constructor({ data, handleCardClick }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this.handleCardClick = handleCardClick;
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
        this._image.addEventListener('click', () => this.handleCardClick(this._name, this._link));
        return this._element;
    }
}