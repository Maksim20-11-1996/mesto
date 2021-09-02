const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupEditProfile = document.getElementById('popup__edit-profile');
const popupEditCloseButton = document.getElementById('edit-profile__close-button');
const popupFormElement = popupEditProfile.querySelector('.popup__form');
const popupInputTitleElement = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = popupEditProfile.querySelector('.popup__input_type_job');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCards = document.getElementById('popup__add-cards');
const popupAddCardsCloseButton = document.getElementById('add-cards__close-button');

const openPopupEditProfile = function() {
    popupInputTitleElement.value = profileInfoTitle.textContent;
    popupInputSubtitleElement.value = profileInfoSubtitle.textContent;
    popupEditProfile.classList.add('popup_is-opened');
}

const closePopupEditProfile = function() {
    popupEditProfile.classList.remove('popup_is-opened');
}

const openPopupAddCards = function() {
    popupAddCards.classList.add('popup_is-opened');
}

const closePopupAddCards = function() {
    popupAddCards.classList.remove('popup_is-opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = popupInputTitleElement.value
    profileInfoSubtitle.textContent = popupInputSubtitleElement.value
    closePopupEditProfile()
}

popupOpenButtonElement.addEventListener('click', openPopupEditProfile);
popupEditCloseButton.addEventListener('click', closePopupEditProfile);
popupFormElement.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', openPopupAddCards);
popupAddCardsCloseButton.addEventListener('click', closePopupAddCards);


const cardImage = document.querySelector('.card__image');
const cardName = document.querySelector('.card__heading');

//form
const addCardsFormElement = document.querySelector('#add-cards__form');
const addCardsNameElement = document.querySelector('#add-cards__name');

//cards
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

const cardsElement = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template').content;

//functions

const removeCardsHandler = (event) => {
    event.target.closest('.card').remove();
};

const addCards = (card) => {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__remove-button').addEventListener('click', removeCardsHandler);

    cardsElement.prepend(cardElement);
};

const addCardsFormHandler = (event) => {
    event.preventDefault();
    addCards({
        name: cardName,
        link: cardImage
    });
    addCardsFormElement.reset();
    closePopupAddCards();
};


addCardsFormElement.addEventListener('submit', addCardsFormHandler);

initialCards.forEach((card) => {
    addCards(card);
});