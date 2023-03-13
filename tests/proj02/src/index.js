import { program } from 'commander'
import database from './database.js'
import Hero from './hero.js'
async function main() {
    program
        .version('v1')
        .option('-n, --name [value]', "Hero's name")
        .option('-p, --power [value]', "Hero's power")
        .option('-i, --id [value]', "Hero's id")
        .option('-a, --add', "Add a hero")
        .option('-l, --list', "List all heroes")
        .option('-r, --remove', "Remove hero by id")
        .option('-u, --update [value]', "Update hero by id")
        .parse(process.argv)

    try {
        const optDict = program.opts()
        const hero = new Hero(optDict)
        if (optDict.add) {
            if (hero.id === undefined) delete hero.id
            const result = await database.addHero(hero)
            if (!result) {
                console.error(`Couldn't add the new hero`)
                return
            }
            console.log(`Hero added sucessfully`)
        }

        if (optDict.list) {
            const result = await database.list()
            console.log(result)
        }

        if (optDict.remove) {
            const result = await database.removeHero(hero.id)
            if (!result) {
                console.error(`Couldn't remove the hero`)
                return
            }
            console.log("Hero removed successfully")
        }

        if (optDict.update) {
            const updateId = parseInt(optDict.update)
            const data = JSON.stringify(hero)
            const updateHero = JSON.parse(data)
            if (!updateHero.id) delete updateHero.id
            const result = await database.updateHero(updateId, updateHero)

            if (!result) {
                console.error(`Couldn't update the hero`)
                return
            }
            console.log("Hero updated successfully")
        }

    } catch (error) {
        console.error("Error: ", error)
    }
}

main()