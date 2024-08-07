// __mocks__/node-localstorage.js

class LocalStorage {
    constructor(directory) {
        this.directory = directory || './local-storage';
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

module.exports = { LocalStorage };
