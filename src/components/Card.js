export class Card {
    constructor(data, templateSelector, userId) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._ownerId = data.ownerId;
        this.handleCardClick = data.handleCardClick;
        this.handleDeleteClick = data.handleDeleteClick;
        this.handleLikeClick = data.handleLikeClick;
        this._templateSelector = templateSelector;
        this._userId = userId;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

    deleteThisCard() {
        this._element.remove(this._id);
    }

    _deleteButtonVisible = () => {
        if (this._ownerId != this._userId) {
            this._element.querySelector('.card__remove-button').classList.add('card__remove-button_hidden')
        } else {
            this._element.querySelector('.card__remove-button').classList.remove('card__remove-button_hidden')
        }
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._element.querySelector('.card__heading').textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;
        this._element.querySelector('.card__like-meter').textContent = this._likes.length;
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this.handleDeleteClick());
        this._element.querySelector('.card__like-button').addEventListener('click', (event) => this.handleLikeClick(event));
        this._image.addEventListener('click', () => this.handleCardClick(this._name, this._link));
        this._deleteButtonVisible();
        this._likeButtonActive();
        return this._element;
    }

    _likeButtonActive = () => {
        if (this._likes.some(like => like['_id'] === this._userId)) {
            this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
        } else {
            this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
        }
    }

    likeCard = () => {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }

    updateLikeMeter = (data) => {
        this._element.querySelector('.card__like-meter').textContent = data.likes.length;
    }
}