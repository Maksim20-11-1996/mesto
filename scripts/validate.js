const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorElement, inputErrorClass, errorClass);
    } else {
        hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    });
}

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, inactiveButtonClass);

    }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        });
    })
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(formElement => {
        setEventListeners(
            formElement,
            config.inputSelector,
            config.submitButtonSelector,
            config.inputErrorClass,
            config.errorClass,
            config.inactiveButtonClass);
    });
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_visible'
});