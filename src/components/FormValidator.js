export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError = (inputElement, errorElement) => {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement, errorElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement);
        } else {
            this._hideInputError(inputElement, errorElement);
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid
        });
    }

    disableSubmitButton = () => {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
    }

    _enableSubmitButton = () => {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this.submitButton.removeAttribute('disabled');
    }

    _toggleButtonState = (inputElement) => {
        if (this._hasInvalidInput(inputElement)) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    setEventListeners = () => {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            });
        })
    }
}