import { ICrud } from "../interfaces/interfaceCrud.js"
export class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    static connect() {
        return this._database.connect()
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }

    isConnected(){
        return this._database.isConnected()
    }
}
