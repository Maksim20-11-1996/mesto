import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },

    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },

    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },

    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },

    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },

    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditCloseButton = document.getElementById('edit-profile__close-button');
const editProfileForm = document.querySelector('#edit-profile__form');
const popupInputTitleElement = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = popupEditProfile.querySelector('.popup__input_type_job');
const popupAddCardsOpenButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-cards');
const popupAddCardsCloseButton = document.getElementById('add-cards__close-button');
const cardsTemplate = document.querySelector('#cards-template').content;

export const openPopup = function(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('mousedown', closePopupByOverlay);
};

export const closePopup = function(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('mousedown', closePopupByOverlay);
};

function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'))
    }
}

const closePopupByOverlay = (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(document.querySelector('.popup_is-opened'))
    }
}

popupEditOpenButton.addEventListener('click', function() {
    popupInputTitleElement.value = profileInfoTitle.textContent;
    popupInputSubtitleElement.value = profileInfoSubtitle.textContent;
    openPopup(popupEditProfile);
});

popupEditCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardsOpenButton.addEventListener('click', () => openPopup(popupAddCards));
popupAddCardsCloseButton.addEventListener('click', () => closePopup(popupAddCards));
editProfileForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = popupInputTitleElement.value
    profileInfoSubtitle.textContent = popupInputSubtitleElement.value
    closePopup(popupEditProfile);
};

const addCardsFormElement = document.querySelector('#add-cards__form');
const addCardsNameElement = addCardsFormElement.querySelector('#name-card');
const addCardsImageElement = addCardsFormElement.querySelector('.popup__input_type_img');
const addCardsSubmitButton = addCardsFormElement.querySelector('.popup__button');
const cardsSection = document.querySelector('.cards');
const popupOpenImage = document.querySelector('#popup_open-image');
const popupOpenImageCloseButton = document.getElementById('popup__open-image_close-button');
popupOpenImageCloseButton.addEventListener('click', () => closePopup(popupOpenImage));

const addCards = (item) => {
    const card = new Card(item.name, item.link, cardsTemplate)
    cardsSection.prepend(card.createCard());
}

initialCards.forEach((item) => {
    addCards(item);
});

const addCardsFormHandler = () => {
    addCards({
        name: addCardsNameElement.value,
        link: addCardsImageElement.value
    }, cardsSection);
    addCardsFormElement.reset();
    closePopup(popupAddCards);
    addCardsFormValidator.disableSubmitButton(addCardsSubmitButton);
};

const listSelector = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_visible'
});

const editProfileFormValidator = new FormValidator(listSelector, editProfileForm);
editProfileFormValidator.setEventListeners();

const addCardsFormValidator = new FormValidator(listSelector, addCardsFormElement);
addCardsFormValidator.setEventListeners();

addCardsFormElement.addEventListener('submit', () => {
    addCardsFormHandler();
})