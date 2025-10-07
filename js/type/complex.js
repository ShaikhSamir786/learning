// Complex: When you access a complex type you work on a reference to its value
// object array function


// array example

const fixedArray = [1, 2, 3];

let changeArray = fixedArray; // reference to the value

changeArray[0] = 4; // modifying the reference

console.log('fixed array ==> ', fixedArray);
console.log('change fixed array ==> ', changeArray);



console.log('===================================================');

// object example
const fixedObject = { a: 1, b: 2 };
let changeObject = fixedObject; // reference to the value
changeObject.a = 3; // modifying the reference
console.log('fixed object ==> ', fixedObject);
console.log('change fixed object ==> ', changeObject);

// function example  -- primitive in this case change original 
 
// sol 1 - wrap inside function - object like mutability
// sol 2 - use higher order function - clean + changeble logic
// sol 3 - use closure
// sol 4-  just call original function // fixedfunction()


// const fixedFunction = () => {
//   console.log('fixed function');
// };
// let changeFunction = fixedFunction; // reference to the value
// changeFunction = () => {
//   console.log('change fixed function');
// };

// changeFunction()

console.log('===================================================');



const originalfunction = {
  fn: () => {
    console.log('fixed function');
  }
};

let changeoriginalFunction = originalfunction; // same reference

// Modify through the reference
changeoriginalFunction.fn = () => {
    
  console.log('change fixed function');
};

originalfunction.fn(); // change fixed function
changeoriginalFunction.fn(); // change fixed function
