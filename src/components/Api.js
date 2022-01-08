const CARD_ENDPOINT = '/cards';
const PROFILE_ENDPOINT = '/users/me';
const AVATAR_ENDOPOINT = '/users/me/avatar';

export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    // получить все карточки
    getAllCards() {
        return fetch(this._url + CARD_ENDPOINT, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    // создать новую карточку
    createCard(name, link) {
        return fetch(this._url + CARD_ENDPOINT, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    // получить данные профиля
    getProfile() {
        return fetch(this._url + PROFILE_ENDPOINT, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    // изменить данные профиля
    patchProfile(name, about) {
        return fetch(this._url + PROFILE_ENDPOINT, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    //удалить карту
    deleteMyCard(data) {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    putLike(data) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject('Произошла ошибка')
        })
    }

    patchAvatar(avatar) {
        return fetch(this._url + AVATAR_ENDOPOINT, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Произошла ошибка')
        })
    }

};