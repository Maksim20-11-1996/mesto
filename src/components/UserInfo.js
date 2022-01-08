export class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    setUserInfo(formData) {
        this._name.textContent = formData.name;
        this._about.textContent = formData.about;
        this._avatar = formData.avatar;
    }

    setUserAvatar(formData) {
        this._avatar = formData.avatar
    }
}