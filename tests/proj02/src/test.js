import { deepEqual, ok } from 'node:assert'

import database from './database.js'
const DEFAULT_CREATE_ITEM = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}


const DEFAULT_UPDATE_ITEM = {
    name: 'Iron Man',
    power: 'Nothing',
    id: 3
}
describe('Handling Heroes', () => {
    before(async () => {
        await database.addHero(DEFAULT_CREATE_ITEM)
    })

    it('should search a hero using files', async () => {
        const expected = DEFAULT_CREATE_ITEM
        const [result] = await database.list(expected.id)
        deepEqual(result, expected)
    })


    it('Should add a Hero in a json file', async () => {
        const expected = { ...DEFAULT_CREATE_ITEM, id: 2, name: 'Batman' }
        const result = await database.addHero(expected)
        const [current] = await database.list(expected.id)
        deepEqual(current, expected)
    })

    it('Should remove a Hero by id', async () => {
        const expected = true;
        const result = await database.removeHero(DEFAULT_CREATE_ITEM.id)
        deepEqual(result, expected)
    })

    it('Should update an hero', async () => {
        const expected = { ...DEFAULT_UPDATE_ITEM, power: 'Money' }
        await database.updateHero(DEFAULT_UPDATE_ITEM.id, expected)
        const [result] = await database.list(DEFAULT_UPDATE_ITEM.id)
        deepEqual(result, expected)
    })

})