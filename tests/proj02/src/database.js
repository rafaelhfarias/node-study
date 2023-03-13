import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
class Database {
    constructor() {
        this.FILENAME = "src/heroes.json"
    }
    async getFileData() {
        const file = await readFileAsync(this.FILENAME, 'utf-8')
        return JSON.parse(file.toString())
    }

    async writeFile(data) {
        await writeFileAsync(this.FILENAME, JSON.stringify(data))
        return true
    }

    async addHero(hero) {
        const data = await this.getFileData()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const newHero = {
            id,
            ...hero
        }
        const newData = [
            ...data,
            newHero
        ]
        const result = this.writeFile(newData)
        return result
    }

    async list(id) {
        const data = await this.getFileData()
        const filteredData = data.filter(item => (id ? (item.id === id) : true))
        return filteredData
    }

    async removeHero(id) {
        if (!id) {
            return false
        }
        const data = await this.getFileData()
        const index = data.findIndex( item => item.id === parseInt(id))
        if (index === -1){
            throw Error(`This hero doesn't exist`)
        }
        data.splice(index,1)
        return await this.writeFile(data)
    }

    async updateHero(id, newData){
        if(!id){
            throw Error(`You didn't pass a valid id`)
        }

        const data = await this.getFileData()
        const index = data.findIndex( item => item.id === parseInt(id))
        if (index === -1){
            throw Error(`This hero doesn't exist`)
        }
        const current = data[index]
        const updateObject = {
            ...current,
            ...newData
        }
        data.splice(index,1)
        return await this.writeFile([...data, updateObject])
    }
}

export default new Database()