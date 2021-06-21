const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupFormElement = document.querySelector('.popup__form');
const popupInputTitleElement = popupElement.querySelector('.popup__input_type_name');
const popupInputSubtitleElement = popupElement.querySelector('.popup__input_type_job');

const openPopup = function() {
    popupInputTitleElement.value = profileInfoTitle.textContent;
    popupInputSubtitleElement.value = profileInfoSubtitle.textContent;
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
}

// const closePopupByClickOverlay = function(event) {
//     if (event.target !== event.currentTarget) {
//         return
//     }
//     closePopup()
// }

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = popupInputTitleElement.value
    profileInfoSubtitle.textContent = popupInputSubtitleElement.value
    closePopup()
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupFormElement.addEventListener('submit', formSubmitHandler);