import { ICrud } from "./interfaces/interfaceCrud.js"

export class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("Item foi salvo em MongoDB")
    }
}

