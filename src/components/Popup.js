export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        document.addEventListener('click', () => this.setEventListeners);
        document.addEventListener('keyup', this._handleEscClose);
        this.renderLoading(false)
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

    renderLoading = (loading) => {
        const saveButton = this._popupElement.querySelector('.popup__button')
        if (loading) {
            saveButton.textContent = 'Сохранение...'
        } else {
            saveButton.textContent = 'Сохранить'
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