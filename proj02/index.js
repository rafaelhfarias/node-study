/*
1- Get User
2- Get user phone by id
3- Get user address by id
*/
// we can import util to use promisify to transform a callback into a Promise
import util from 'node:util'
const getAddressAsync = util.promisify(getAddressById)
const getUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: 'Rafael'
            })
        }, 1000)
    })
}

const getPhoneById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id,
                ddd: 21,
                phone: 99119911
            })
        }, 2000)
    })
}

function getAddressById(id, callback){
    setTimeout(() => {
        return callback(null,{
            id,
            street: 'Avenue John Doe',
            number: '12321'
        })
    }, 2000)
}

const userPromise = getUser()
userPromise
    .then(user => {
        return getPhoneById(user.id)
            .then((result) => { // if we want to pass the past Promise result in the pipe to the next one 
                return {        // we need to resolve it first and put it in a single object response with
                    user: {     // both resolved results
                        name: user.name,
                        id: user.id
                    },
                    phone: result
                }
            })
    })
    .then((res) => {
        const address = getAddressAsync(res.user.id)
        return address.then((result) => {
            return {
                user: res.user,
                phone: res.phone,
                address: result
            }
        })
    })
    .then(res => {
        console.log(`
            Name: ${res.user.name},
            Phone: (${res.phone.ddd})${res.phone.phone},
            Address: ${res.address.street}, ${res.address.number}
        `)
    })
    .catch(err => {
        console.log('error: ', err)
    })