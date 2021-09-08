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
}];

const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditCloseButton = document.getElementById('edit-profile__close-button');
const popupFormElement = popupEditProfile.querySelector('.popup__form');
const popupInputTitleElement = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = popupEditProfile.querySelector('.popup__input_type_job');
const popupAddCardsOpenButton = document.querySelector('.profile__add-button');
const popupAddCards = document.querySelector('.popup_add-cards');
const popupAddCardsCloseButton = document.getElementById('add-cards__close-button');

const openPopup = function (popup) {
    popup.classList.add('popup_is-opened');
};

const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
};

popupEditOpenButton.addEventListener('click', function() {
    popupInputTitleElement.value = profileInfoTitle.textContent;
    popupInputSubtitleElement.value = profileInfoSubtitle.textContent;
    openPopup(popupEditProfile);
});

popupEditCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardsOpenButton.addEventListener('click', () => openPopup(popupAddCards));
popupAddCardsCloseButton.addEventListener('click', () => closePopup(popupAddCards));
popupFormElement.addEventListener('submit', submitProfileForm);

function submitProfileForm(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = popupInputTitleElement.value
    profileInfoSubtitle.textContent = popupInputSubtitleElement.value
    closePopup(popupEditProfile);
};

const addCardsFormElement = document.querySelector('#add-cards__form');
const addCardsNameElement = document.querySelector('#add-cards__name');
const addCardsImageElement = document.querySelector('.popup__input_type_img');
const cardsElement = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template').content;

const removeCardsHandler = (event) => {
    event.target.closest('.card').remove();
};

const popupOpenImage = document.querySelector('#popup_open-image');
const popupOpenImageCloseButton = document.getElementById('popup__open-image_close-button');
const popupImage = popupOpenImage.querySelector('.popup__image-picture');
const popupName = popupOpenImage.querySelector('.popup__image-name');

const cardElement = cardsTemplate.querySelector('.card');

const createCards = (card) => {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__remove-button').addEventListener('click', removeCardsHandler);
    cardElement.querySelector('.card__like-button').addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_active');
    });
    cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(card)); 
    return cardElement;
};

const addCards = (card) => {     
    cardsElement.prepend(createCards(card));
};

const openImagePopup = (card) => {
    popupImage.src = card.link;
    popupName.textContent = card.name;
    popupImage.alt = card.name;
    openPopup(popupOpenImage);
};

popupOpenImageCloseButton.addEventListener('click', () => closePopup(popupOpenImage));

const addCardsFormHandler = (event) => {
    event.preventDefault();
    addCards({
        name: addCardsNameElement.value,
        link: addCardsImageElement.value
    }, cardsElement);
    addCardsFormElement.reset();
    closePopup(popupAddCards);
};

addCardsFormElement.addEventListener('submit', addCardsFormHandler);

initialCards.forEach((card) => {
    addCards(card, cardsElement)
  })