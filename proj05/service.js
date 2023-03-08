import axios from 'axios'

const URL = `https://swapi.dev/api/people`

export async function getCharacter(name) {
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

