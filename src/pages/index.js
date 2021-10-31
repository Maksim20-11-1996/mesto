import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

const popupOpenImage = new PopupWithImage('#popup_open-image');

const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('#edit-profile__form');
const popupInputTitleElement = document.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = document.querySelector('.popup__input_type_job');
const popupAddCardsOpenButton = document.querySelector('.profile__add-button');

popupOpenImage.setEventListeners()

const userInfo = new UserInfo({
    name: profileInfoTitle,
    about: profileInfoSubtitle
});

const formEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData)
    }
});
formEditProfile.setEventListeners();

popupEditOpenButton.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    popupInputTitleElement.value = userData.name;
    popupInputSubtitleElement.value = userData.about;
    formEditProfile.open()
});

const createCard = (data) => {
    const card = new Card({
            data,
            handleCardClick: () => {
                popupOpenImage.open(data.link, data.name);
            }
        },
        '#cards-template');
    const cardElement = card.createCard();
    return cardElement;
};

const addCardsFormElement = document.querySelector('#add-cards__form');
const addCardsNameElement = addCardsFormElement.querySelector('#name-card');
const addCardsImageElement = addCardsFormElement.querySelector('.popup__input_type_img');
const addCardsSubmitButton = addCardsFormElement.querySelector('.popup__button');
const cardsSection = document.querySelector('.cards');

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardListItem = createCard(item);
        cardList.addItem(cardListItem);
    }
}, '.cards')
cardList.renderItems();

const formAddCards = new PopupWithForm({
    popupSelector: '.popup_add-cards',
    handleFormSubmit: () => {
        const newCard = createCard({
            link: addCardsImageElement.value,
            name: addCardsNameElement.value
        })
        cardList.addItem(newCard);
        addCardsFormValidator.disableSubmitButton(addCardsSubmitButton);
    }
});
formAddCards.setEventListeners();

popupAddCardsOpenButton.addEventListener('click', () => formAddCards.open());


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