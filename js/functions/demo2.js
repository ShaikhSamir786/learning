// Wrap immediately invoked function expressions (IIFE) in parentheses

// What is an IIFE?

// An IIFE is a function that runs immediately after being defined:

// Clarifies intention

// Wrapping the whole function makes it clear it’s an expression, not a declaration.

// Avoids ambiguity

// Without wrapping, JavaScript might interpret it as a function declaration, leading to syntax errors.

// Historical consistency

// Before ES modules were common, IIFEs were heavily used to create local scopes.

// Code readability

// Parentheses visually group the function and its invocation as one unit.

// bad example
    function() {
  console.log('Bad IIFE');
}(); // ❌ May throw error




{

    // good example
    (function() {
  console.log('Runs immediately');
})();
}


// In modern JavaScript with ES modules (import/export), you rarely need IIFEs anymore, because each module already has its own scope

// Consider ES modules or block-scoped variables (let, const) instead of IIFEs for scoping.