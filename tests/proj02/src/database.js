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

    async addHero(hero){
        const data = await this.getFileData()
        const id = hero.id <=2 ? hero.id : Date.now()
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
        const filteredData = data.filter(item => (item ? (item.id === id) : true))
        return filteredData
    }
}

export default new Database()