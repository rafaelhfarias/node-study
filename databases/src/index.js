import { ContextStrategy } from "./strategies/base/contextStrategy.js"
import { MongoDB } from "./strategies/mongodb.js"
import { Postgres } from "./strategies/postgres.js"
const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()