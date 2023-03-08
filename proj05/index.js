import { getCharacter } from "./service.js";


async function main() {
    try {
        const result = await getCharacter('a')
        const names = []
        // Test for, for-in and for-of 
        console.time('for')
        for (let i = 0; i < result.results.length; i++) {
            const character = result.results[i]
            names.push(character.name)
        }
        console.timeEnd('for')

        console.time('for-in')
        for (let i in result.results) {
            const character = result.results[i]
            names.push(character.name)
        }
        console.timeEnd('for-in')

        console.time('for-of')
        for (let character of result.results) {
            names.push(character.name)
        }
        console.timeEnd('for-of')

        // Map
        console.time('map')
        const mapNames = result.results.map((char) => char.name)
        console.log(mapNames)
        console.timeEnd('map')


        // Reduce
        const totalHeight = result.results.reduce((acc, curr) => {
            return parseInt(acc) + parseInt(curr.height)
        }, 0)

        console.log(`Height: ${totalHeight}`)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

main()