class Queue {
    constructor () {
        this.items = []
    }

    enqueue (data) {
        this.items.push (data)
    }

    dequeue () {
        if (this.items.length != 0) {
            this.items.shift()
        }
    }

    peek () {
        if (this.items.length === 0) {
            return []
        }

        return this.items[0]
    }
}