export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
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

    _hasInvalidInput = (inputList) => {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
        });
    }

    _disableSubmitButton = (buttonElement) => {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    _enableSubmitButton = (buttonElement) => {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState = (inputList, inputElement) => {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(inputList, inputElement)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    setEventListeners = () => {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
            });
        })
    }
}