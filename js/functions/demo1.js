// Use named function expressions instead of function declarations. eslint


//Improved debugging
// Better control over hoisting
// Consistency with arrow functions and callbacks
// Prevents accidental re-declaration

const items = [
  { price: 1 },
  { price: 2 },
  { price: 3 },
  { price: 4 },
  { price: 5 }
];


{ // bad example
    function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);



}
  console.log('Total:', calculateTotal(items));
}


{
    // Good Example (named function expression)

    const calculateTotal = function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);



}
  console.log('Total:', calculateTotal(items));
};