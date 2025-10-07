abstract class Takephot0 {
    constructor (public cameraMode : string , public filter : string){}
    abstract getSepia() : void
}


class camera extends Takephot0 {

    constructor (public cameraMode : string , public filter : string , public burst : number){
        super(cameraMode , filter)
    }
    getSepia(): void {
        console.log("i am upper class anstract method")
    }

}

let c1 = new    camera ("xyz", "abc" , 5)
console.log(c1)
c1.getSepia()
