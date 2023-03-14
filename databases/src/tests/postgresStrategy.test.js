import assert from 'node:assert'
import { Postgres } from '../strategies/postgres.js'
import { ContextStrategy } from '../strategies/base/contextStrategy.js'


const context = new ContextStrategy(new Postgres())
const MOCK_HERO_CREATE = {
    name: 'Superman',
    power: 'Everything'
}

const MOCK_HERO_UPDATE = {
    name: 'Batman',
    power: 'Money'
}

describe('Postgres strategy', () => {
    before(async () => {
        await context.connect()
        await context.create(MOCK_HERO_UPDATE)
    })
    it('PostgreSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Add Hero', async () => {
        const result = await context.create(MOCK_HERO_CREATE)
        delete result.id
        assert.deepEqual(result, MOCK_HERO_CREATE)
    })

    it('List Heroes', async () => {
        const [result] = await context.read({ name: MOCK_HERO_CREATE.name })
        delete result.id
        assert.deepEqual(result, MOCK_HERO_CREATE)
    })

    it('Update Heroes', async () => {
        const [updateItem] = await context.read({ name: MOCK_HERO_UPDATE.name })
        const newItem = {
            ...MOCK_HERO_UPDATE,
            name: 'Iron Man'
        }
        const result = await context.update(updateItem.id, newItem)
        delete result.id
        assert.deepEqual(result, newItem)
    })

    it('Delete Hero', async () => {
        const objectToDelete = await context.create(MOCK_HERO_CREATE)
        const result = await context.delete(objectToDelete.id)
        assert.deepEqual(result, 1)
    })

})