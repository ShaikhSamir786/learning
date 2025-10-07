// Use default parameter syntax rather than mutating function arguments. 

// Unexpected side effects

// Changing function parameters mutates the variable passed into the function if it's an object/array.

// Harder to debug

// The original argument may unexpectedly change elsewhere in the program.

// Reduces code clarity

// Readers may not know whether the argument is used as-is or mutated inside the function.

// Conflicts with functional programming principles

// Functions should avoid side effects when possible.

{
    // bad
function addItem(list) {
  list = list || []; // ❌ If list is passed, this may break expectations
  list.push('new item');
  return list;
}

const items = ['apple'];
addItem(items);
console.log(items); //  mutated unintentionally!



// note : Here, the parameter name is reassigned if falsy (undefined, null, '').
}


console.log('------------------------------');


{
    //  good
  function addItem(list = []) { // ✅ Safe default
  return [...list, 'new item'];
}


const items = ['apple'];
addItem(items);
console.log(items); // ['apple']

}