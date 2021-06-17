const ProfileInfoTitle = document.querySelector('.profile__info_title');
const ProfileInfoSubtitle = document.querySelector('.profile__info_subtitle');
const PopupOpenButtonElement = document.querySelector('.profile__edit-button');
const PopupElement = document.querySelector('.popup');
const PopupCloseButtonElement = PopupElement.querySelector('.popup__close-button');
const PopupFormElement = document.querySelector('.popup__form');
const PopupInputTitleElement = PopupElement.querySelector('.popup__form_title');
const PopupInputSubtitleElement = PopupElement.querySelector('.popup__form_subtitle');
const ProfileInfoSaveButton = PopupElement.querySelector('.popup__save-button');

const OpenPopup = function () {
    PopupInputTitleElement.value = ProfileInfoTitle.textContent;
    PopupInputSubtitleElement.value = ProfileInfoSubtitle.textContent;
    PopupElement.classList.add('popup_is-opened');
}

const ClosePopup = function () {
    PopupElement.classList.remove('popup_is-opened');
}

const ClosePopupByClickOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    ClosePopup()
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileInfoTitle.textContent = PopupInputTitleElement.value
    ProfileInfoSubtitle.textContent = PopupInputSubtitleElement.value
    ClosePopup()
}

PopupOpenButtonElement.addEventListener('click', OpenPopup);
PopupCloseButtonElement.addEventListener('click', ClosePopup);
PopupElement.addEventListener('click', ClosePopupByClickOverlay);
PopupFormElement.addEventListener('submit', formSubmitHandler);