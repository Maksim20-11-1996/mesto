import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

let userId

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-32',
    headers: {
        authorization: "d425224f-bddc-4f62-afce-14d5d47b8ea6",
        "content-type": "application/json"
    }
});

api.getProfile().then((res) => {
    return res._id
}).then((res) => {
    userId = res;
}).catch(err => alert(err));

const cardsArray = Array.from(api.getAllCards());

const cards = api.getAllCards();
cards.then((data) => {
        const cardList = new Section({
            items: data,
            renderer: (item) => {
                const cardListItem = createCard(item);
                cardList.addItem(cardListItem);
            }
        }, '.cards', api)
        cardList.renderItems();
    })
    .catch((err) => console.log(err));

api.getProfile().then((res) => {
    userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar
    });
    profileInfoAvatar.src = res.avatar
});

const popupOpenImage = new PopupWithImage('#popup_open-image');

const submitButton = document.querySelector('.popup__button');
const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const profileInfoAvatar = document.querySelector('.profile__image');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('#edit-profile__form');
const popupInputTitleElement = document.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = document.querySelector('.popup__input_type_job');
const popupAddCardsOpenButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const editAvatarForm = document.querySelector('#edit-avatar__form');

popupOpenImage.setEventListeners()

const userInfo = new UserInfo({
    name: profileInfoTitle,
    about: profileInfoSubtitle,
    avatar: profileInfoAvatar
});

const formEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    handleFormSubmit: (formData) => {
        api.patchProfile(formData.name, formData.about).then((res) => {
                    userInfo.setUserInfo({
                        name: res.name,
                        about: res.about
                    })
                },
                editProfileFormValidator.disableSubmitButton(submitButton))
            .catch(err => alert(err))
    }
});
formEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    handleFormSubmit: (formData) => {
        api.patchAvatar(formData.avatar).then((userData) => {
                    userInfo.setUserAvatar(userData)
                    profileInfoAvatar.src = userData.avatar
                },
                editAvatarFormValidator.disableSubmitButton(submitButton))
            .catch(err => alert(err))
    }
});
popupEditAvatar.setEventListeners();
editAvatarButton.addEventListener('click', () => popupEditAvatar.open());


popupEditOpenButton.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    popupInputTitleElement.value = userData.name;
    popupInputSubtitleElement.value = userData.about;
    formEditProfile.open()
});

const createCard = (data) => {
    const card = new Card({
            name: data.name,
            link: data.link,
            id: data._id,
            likes: data.likes,
            ownerId: data.owner._id,
            handleCardClick: () => popupOpenImage.open(data.link, data.name),
            handleDeleteClick: () => {
                const popupDeleteCard = new PopupWithSubmit({
                    popupSelector: '.popup_delete-cards',
                    handleFormSubmit: () => {
                        api.deleteMyCard(data).then(() => {
                            card.deleteThisCard()
                        }).catch(err => alert(err))
                    }
                })
                popupDeleteCard.open()
                popupDeleteCard.setEventListeners()
            },
            handleLikeClick: () => {
                if (!data.likes.some(like => like['_id'] === userId)) {
                    api.putLike(data).then(res => {
                        card.likeCard();
                        card.updateLikeMeter(res);
                        data = res;
                    }).catch(err => alert(err));
                } else {
                    api.deleteLike(data).then(res => {
                        card.likeCard();
                        card.updateLikeMeter(res);
                        data = res;
                    }).catch(err => alert(err))
                }
            }
        },
        '#cards-template', userId);
    const cardElement = card.createCard();
    return cardElement;
};

const addCardsFormElement = document.querySelector('#add-cards__form');
const addCardsNameElement = addCardsFormElement.querySelector('#name-card');
const addCardsImageElement = addCardsFormElement.querySelector('.popup__input_type_img');

const cardList = new Section({
    items: cardsArray,
    renderer: (item) => {
        createCard(item);
    }
}, '.cards', api)

const formAddCards = new PopupWithForm({
    popupSelector: '.popup_add-cards',
    handleFormSubmit: () => {
        api.createCard(addCardsNameElement.value, addCardsImageElement.value)
            .then((resCard) => {
                cardList.addItem(createCard(resCard));
                addCardsFormValidator.disableSubmitButton(submitButton);
            }).catch(err => alert(err))
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

const editAvatarFormValidator = new FormValidator(listSelector, editAvatarForm);
editAvatarFormValidator.setEventListeners();