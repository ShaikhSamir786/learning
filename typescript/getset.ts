class user {
    constructor (public _name : string){}

    //naming practice publis _name

    getname (){
        return this._name
    
    }

    setname ( value : string){
        this._name = value
    
    }
}


let u1 = new user ("john")
