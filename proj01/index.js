/*
1- Get User
2- Get user phone by id
3- Get user address by id
*/

const getUser = (callback) => {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            name: 'Rafael'
        })
    }, 1000)
}

const getAddressById = (id, callback) => {
    setTimeout(() => {
        return callback(null, {
            id,
            street: 'Avenue John Doe',
            number: '12321'
        })
    }, 2000)
}

const getPhoneById = (id, callback) => {
    setTimeout(() => {
        return callback(null,{
            id,
            ddd: 21,
            phone: 99119911
        })
    }, 2000)
}

getUser(function resolveUser(error, user){
    if(error){
        console.log('Failed to get user')
        return 
    }
    getPhoneById(user.id, function resolvePhone(errorPhone, phone){
        if (errorPhone){
            console.log('Error on getting phone number')
            return 
        }
        getAddressById(user.id, function resolverAddress(errorEnd, address){
            if(errorEnd){
                console.log('Error on getting address')
                return
            }
            console.log(`
                Name: ${user.name},
                Phone: (${phone.ddd})${phone.phone},
                Address: ${address.street}, ${address.number}
            `)
        })
    })
})
