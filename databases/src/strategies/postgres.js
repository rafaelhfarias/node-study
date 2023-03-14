import { ICrud } from "./interfaces/interfaceCrud.js"
import Sequelize from "sequelize";

export class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
        this._connect()
    }

    _connect() {
        this._driver = new Sequelize.Sequelize('heroes', 'rafaelhf', 'password',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
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

    async defineModel() {
        this._heroes = driver.define('heroes', {
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
        await Heroes.sync()
    }

    create(item) {
        console.log("Item foi salvo em Postgres")
    }
}