import { ICrud } from "../interfaces/interfaceCrud.js"
import mongoose, { Mongoose } from "mongoose"

export class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    static async connect() {
        await mongoose.connect('mongodb://rafaelhf:password@localhost:27017/heroes').catch(err => console.log('Failed to connect with MongoDB', err))
        const connection = mongoose.connection
        return connection 
    }

    async isConnected() {
        const state = this._connection.readyState
        if (state === 1) return state
        if (state !== 2) return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this._connection.readyState
    }

    async create(item) {
        const result = await this._schema.create(item)
        return result
    }

    async read(where) {
        const result = await this._schema.findOne(where).lean()
        return result
    }

    async update(id, item) {
        const result = await this._schema.findOneAndUpdate({ _id: id }, { $set: item }, { new: true })
        return result
    }

    async delete(id) {
        const { deletedCount } = await this._schema.deleteOne({ _id: id })
        console.log(deletedCount)
        return deletedCount
    }
}

