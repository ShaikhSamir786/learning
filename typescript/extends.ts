class bottlemaker {
    constructor(private name : string){}
}


class bottlemaker1 extends bottlemaker {
    constructor(name: string) {
        super(name);
    }

    getchnagebottlemakervalue{
        this.name = "changing name of bottlemaker"
    }

}


let b1 = new bottlemaker1 ("john " , 12)
// console.log(b1.name)
// console.log(b1.age)


b1.getchnagebottlemakervalue()
console.log(b1.name)

