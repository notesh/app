import { expect } from "chai"
import { Storage } from "./storage.js"

class StoreDummy {
    constructor() {
        this.collection = {}
    }

    getItem(key) {
        return this.collection[key]
    }

    setItem(key, value) {
        this.collection[key] = value
    }
}

describe("Storage", () => {
    it("stores data as JSON", () => {
        const dummy = new StoreDummy()
        const storage = new Storage(dummy)

        storage.store({ aKey: "aValue" })

        const stored = dummy.getItem("notes")
        expect(JSON.parse(stored).aKey).to.equal("aValue")
    })

    it("retrieves data from a predefined key", () => {
        const dummy = new StoreDummy()
        dummy.setItem("notes", JSON.stringify({ aKey: 1 }))
        const storage = new Storage(dummy)

        const stored = storage.retrieve()

        expect(stored.aKey).to.equal(1)
    })

    it("maintains only last stored information", () => {
        const storage = new Storage(new StoreDummy())

        storage.store({ aKey: "aValue" })
        storage.store({ otherKey: "otherValue" })

        const stored = storage.retrieve()
        expect(stored.aKey).to.equal(undefined)
        expect(stored.otherKey).to.equal("otherValue")
    })
})
