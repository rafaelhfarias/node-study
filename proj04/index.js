import { EventEmitter } from 'node:events'

class MyEmitter extends EventEmitter{

}

const myEmitter = new MyEmitter()
const eventName = 'user:click'

myEmitter.on(eventName, (click) =>{
    console.log('an user clicked in', click)
})


const stdin = process.openStdin() // Pay attention when using Promises since Promises just resolves once.
stdin.addListener('data', (value) => { // We use events to take decisions always when something (event) happens
    console.log(`You typed: ${value.toString().trim()}`)
})