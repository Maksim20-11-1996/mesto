export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        document.addEventListener('click', () => this.setEventListeners);
        document.addEventListener('keyup', this._handleEscClose);
        this._popupElement.classList.add('popup_is-opened');

    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose)
        document.removeEventListener('click', () => this.setEventListeners);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}