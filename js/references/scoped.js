// Note that both let and const are block-scoped, whereas var is function-scoped.


// const and let only exist in the blocks they are defined in.

// what is block scope?
// block scope is the area within a pair of curly braces {} , which defines the scope of variables declared with let and const
{
  let a = 1;
  const b = 1;
  var c = 1;
  
}

// this work because let and const are block-scoped
{
    let d= 2;
    if (true) {

    console.log('d : ', d);
        // let c = 2;
    }

}


//console.log(a); // ReferenceError
// type error
console.log(typeof a); // "undefined" // it is undefined because it is block-scoped
console.log(typeof b); // "undefined" // it is undefined because it is block-scoped


//console.log(typeof c); // "number"
console.log(c); // Prints 1
