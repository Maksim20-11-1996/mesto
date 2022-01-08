export class Section {
    constructor({ items, renderer }, containerSelector, api) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }

    _saveItem(data) {
        this._api
            .addCard({
                name: data.name,
                link: data.link
            })
            .then((data) => {
                this.addItem(data.name, data.link)
            })
            .catch((err) => console.log(err))
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }
}