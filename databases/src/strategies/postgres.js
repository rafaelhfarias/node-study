import { ICrud } from "./interfaces/interfaceCrud.js"

export class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("Item foi salvo em Postgres")
    }
}