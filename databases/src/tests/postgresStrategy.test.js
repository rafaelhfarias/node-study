import assert from 'node:assert'
import { Postgres } from '../strategies/postgres.js'
import { ContextStrategy } from '../strategies/base/contextStrategy.js'


const context = new ContextStrategy(new Postgres())


describe('Postgres strategy', () => {
    it('PostgreSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result,true)
    })
})