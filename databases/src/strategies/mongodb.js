import { ICrud } from "./interfaces/interfaceCrud.js"
import mongoose, { Mongoose } from "mongoose"

export class MongoDB extends ICrud {
    constructor() {
        super()
        this._heroes = null
    }

    async connect() {
        await mongoose.connect('mongodb://rafaelhf:password@localhost:27017/heroes').catch(err => console.log('Failed to connect with MongoDB', err))
        this._driver = mongoose.connection
        this.defineModel()
    }

    defineModel() {
        const schema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._heroes = mongoose.model('heroes', schema)
    }

    async isConnected() {
        const state = this._driver.readyState
        if (state === 1) return state
        if (state !== 2) return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this._driver.readyState
    }

    async create(item) {
        const result = await this._heroes.create(item)
        return result
    }

    async read(where) {
        const result = await this._heroes.findOne(where).lean()
        return result
    }

    async update(id, item) {
        console.log('update item', item)
        const result = await this._heroes.findOneAndUpdate({ _id: id }, { $set: item }, { new: true })
        return result
    }

    async delete(id){
        const {deletedCount} = await this._heroes.deleteOne({_id: id})
        console.log(deletedCount)
        return deletedCount
    }
}

