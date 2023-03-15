import { ICrud } from "./interfaces/interfaceCrud.js"
import Sequelize from "sequelize";

export class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    }
    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            power: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        }
        )
        await this._heroes.sync()
    }

    async connect() {
        this._driver = new Sequelize.Sequelize('heroes', 'rafaelhf', 'password',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
            }
        )
        await this.defineModel()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('failed to connect', error)
            return false
        }
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item)
        return dataValues
    }

    async read(item = {}) {
        return await this._heroes.findAll({ where: item, raw: true })
    }

    async update(id, newItem) {
        const [_, [result]] = await this._heroes.update(newItem, { where: { id: id }, returning: true, raw: true })
        return result
    }

    async delete(id) {
        return await this._heroes.destroy({ where: { id: id } })
    }
}