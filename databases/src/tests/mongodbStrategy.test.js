import { MongoDB } from '../strategies/mongodb.js'
import { ContextStrategy } from '../strategies/base/contextStrategy.js'
import assert from 'node:assert'
const context = new ContextStrategy(new MongoDB())
const DEFAULT_HERO_CREATE = {
    name: 'Spider Man',
    power: 'Web'
}

const DEFAULT_HERO_UPDATE = {
    name: 'Green Lantern',
    power: 'Alien'
}

describe('Testing MongoDB', () => {
    before(async () => {
        await context.connect()
        await context.create(DEFAULT_HERO_UPDATE)
    })

    it('Is connected', async () => {
        const result = await context.isConnected()
        assert.deepEqual(result, 1)
    })
    it('Create hero', async () => {
        const { name, power } = await context.create(DEFAULT_HERO_CREATE)
        assert.deepEqual({ name, power }, DEFAULT_HERO_CREATE)
    })

    it('Read hero', async () => {
        const { name, power } = await context.read(DEFAULT_HERO_CREATE)
        assert.deepEqual({ name, power }, DEFAULT_HERO_CREATE)
    })

    it('Update Hero', async () => {
        const current = await context.create(DEFAULT_HERO_UPDATE)
        const updatedHero = {
            ...DEFAULT_HERO_UPDATE,
            power: 'Ring'
        }
        const { name, power } = await context.update(current._id, updatedHero)
        assert.deepEqual({ name, power }, updatedHero)
    })

    it('Delete Hero', async () => {
        const deleteObject = await context.read(DEFAULT_HERO_CREATE)
        console.log('deleteObject', deleteObject)
        const result = await context.delete(deleteObject._id)
        assert.deepEqual(result, 1)
    })
})