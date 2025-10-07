// Never use arguments, opt to use rest syntax ... instead. eslint: prefer-rest-params


// Reasons to avoid arguments and use rest syntax

// arguments is not a real array – it’s array-like, which means it lacks methods like .map(), .filter(), .reduce(), etc., making manipulation cumbersome.

// Less readable and explicit – using arguments hides which parameters are expected, while rest parameters (...args) clearly state intent.

// Cannot be used in arrow functions – arrow functions don’t have their own arguments object, but rest syntax works in them.

// Potential for bugs in strict mode – arguments can behave differently in strict vs non-strict mode due to its linkage with function parameters.

// Improved maintainability – rest syntax makes refactoring easier since it's part of the standard parameter list.

// ES6+ standard – rest parameters are modern, cleaner, and more future-proof than the legacy arguments object.




{
    // bad 
    function multiply() {
  let product = 1;
  for (let i = 0; i < arguments.length; i++) {
    product *= arguments[i];
  }
  return product;
}

}


{
    function multiply(...numbers) {
  return numbers.reduce((product, num) => product * num, 1);
}

}