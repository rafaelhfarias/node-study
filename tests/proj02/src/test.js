import { deepEqual, ok } from 'node:assert'

import database from './database.js'
const DEFAULT_CREATE_ITEM = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}
describe('Handling Heroes', () => {
    before(async () => {
        await database.addHero(DEFAULT_CREATE_ITEM)
    })

    it('should search a hero using files', async () => {
        const expected = DEFAULT_CREATE_ITEM
        const [result] = await database.list(expected.id)
        deepEqual(result,expected)
    })


    it('Should add a Hero in a json file', async () => {
        const expected = {...DEFAULT_CREATE_ITEM, id: 2, name: 'Batman'}
        const result = await database.addHero(expected)
        const [current] = await database.list(expected.id)
        deepEqual(current,expected)
    })
})