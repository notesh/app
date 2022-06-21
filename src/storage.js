export class Storage {
    constructor(storage) {
        this.collection = "notes"
        this.storage = storage
    }

    retrieve() {
        const content = this.storage.getItem(this.collection)
        return JSON.parse(content)
    }

    store(value) {
        this.storage.setItem(this.collection, JSON.stringify(value))
    }
}
