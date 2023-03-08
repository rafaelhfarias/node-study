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

main()
async function main (){
    try{
        const user = await getUser()  
        const [phone, address] = await Promise.all([ // As both Promises are independent we can call then in parallel using Promise.all
            getPhoneById(user.id),
            getAddressAsync(user.id)
        ])

        console.log(`
            Name: ${user.name},
            Phone: (${phone.ddd})${phone.phone},
            Address: ${address.street}, ${address.number}
        `)

    }catch (error) {
         
    }
}