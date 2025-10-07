// Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following 8.2. eslin

// this is about the ESLint rule array-callback-return, which ensures that callbacks passed to array methods like .map(), .filter(), .reduce(), .every(), .some(), etc., always explicitly return a value (when appropriate)

// Some array methods depend on return values
// .map() → builds a new array based on returned values
// .filter() → includes only elements where callback returns true
// .reduce() → carries forward the returned accumulator

// Map -Bad

{
    const numbers = [1, 2, 3];

const doubled = numbers.map(num => {
  num * 2; // ❌ Missing return, returns undefined for each element
});

console.log(doubled); // [undefined, undefined, undefined]

}

console.log('==================================');


// Map - Good
{
    arr =[1, 2, 3]

const tp = arr.map((x) => {
  const y = x + 1;
  return x * y;
});

console.log(tp)

}
console.log('==================================');



