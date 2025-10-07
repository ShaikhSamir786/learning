// Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears. eslint



// The ESLint rule "Never declare a function in a non-function block" exists to prevent inconsistent behavior across JavaScript engines when declaring functions inside blocks like if, while, or for


// Why is this bad?

//Inconsistent behavior across browsers
// Some browsers hoist the function declaration outside the block,
// Others treat it as block-scoped,
// Unpredictable scope
// Difficult to debug & maintain
// Not aligned with ECMAScript spec (in strict mode)

{
    // bad example

    if (true) {
  function greet() { // ❌ May behave differently in different browsers
    console.log('Hello from bad example');
  }
}

greet(); // Works in some browsers, fails in others

}


{
    // good example
    let greet;

if (true) {
  greet = function () { // ✅ Consistent behavior
    console.log('Hello from good example');
  };
}

greet(); // Always works as expected
}