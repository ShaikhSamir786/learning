// Never name a parameter arguments. This will take precedence over the arguments object that is given to every function scope


// It shadows the built-in arguments object

// JavaScript automatically provides an arguments object for normal functions (not arrow functions) that contains all arguments passed to that function.

// function func1(a, b, c) {
//   console.log(arguments[0]);
//   // Expected output: 1

// Inconsistent with best practices

// Modern JavaScript prefers rest parameters (...args) over arguments.


{
    function sum(...args) {
  return args[0] + args[1];
}

console.log(sum(3, 5)); // 8

}

console.log('---------------------');


{
    // older waay
    function func1(a, b, c) {
  console.log(arguments[0]);
  // Expected output: 1

  console.log(arguments[1]);
  // Expected output: 2

  console.log(arguments[2]);
  // Expected output: 3
}

func1(1, 2, 3);

}