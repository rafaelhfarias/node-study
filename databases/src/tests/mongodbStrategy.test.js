import { MongoDB } from '../strategies/mongodb/mongodb.js'
import { ContextStrategy } from '../strategies/base/contextStrategy.js'
import { HeroSchema } from '../strategies/mongodb/schemas/heroSchema.js'
import assert from 'node:assert'


const DEFAULT_HERO_CREATE = {
    name: 'Spider Man',
    power: 'Web'
}

const DEFAULT_HERO_UPDATE = {
    name: 'Green Lantern',
    power: 'Alien'
}

let context = {}

describe('Testing MongoDB', () => {
    before(async () => {
        const connection = await (MongoDB.connect())
        context = new ContextStrategy(new MongoDB(connection, HeroSchema))
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
        const result = await context.delete(deleteObject._id)
        assert.deepEqual(result, 1)
    })
})