import { ICrud } from "../interfaces/interfaceCrud.js"
import Sequelize from "sequelize";

export class Postgres extends ICrud {
    constructor(connection, schema ) {
        super()
        this._connection = connection
        this._schema = schema
    }

    static async connect() {
        const connection = new Sequelize.Sequelize('heroes', 'rafaelhf', 'password',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false
            }
        )
        return connection
    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('failed to connect', error)
            return false
        }
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        return await this._schema.findAll({ where: item, raw: true })
    }

    async update(id, newItem) {
        const [_, [result]] = await this._schema.update(newItem, { where: { id: id }, returning: true, raw: true })
        return result
    }

    async delete(id) {
        return await this._schema.destroy({ where: { id: id } })
    }
}