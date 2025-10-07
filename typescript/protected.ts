class bottlemaker  {
    protected name = "milton"
}

class bottlemaker1 extends bottlemaker {
    public materials = "metal"

    changename (){
        this.name = "changing name"
    }
}

let b1 = new bottlemaker1()
b1.changename()
console.log(b1)