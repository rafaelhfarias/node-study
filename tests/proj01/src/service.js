import axios from 'axios'

const URL = 'https://swapi.dev/api/people'

export async function getCharacter(name) {
    const url = `${URL}/?search=${name}&format=json`
    const result = await axios.get(url)
    return result.data.results.map(mapCharacter)
}

function mapCharacter(item){
    return {
        name: item.name,
        height: item.height
    }
}