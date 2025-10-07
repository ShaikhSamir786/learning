// Prefer the use of the spread syntax ... to call variadic functions. eslint: prefer-spread 



// Why prefer spread syntax?

// Cleaner and more readable
    // Spread syntax is shorter and more intuitive than using .apply().

// Avoids unnecessary this binding
    // apply() requires a this context (even if you pass null), whereas spread does not.

// More consistent with modern JavaScript
    // Spread syntax is the standard approach in ES6+ for expanding arrays into function arguments.

// Less error-prone
    // With .apply(), forgetting to set the correct this can cause runtime errors.


{

    //  Bad Example (using apply())
    const numbers = [1, 2, 3, 4];

console.log(Math.max.apply(null, numbers)); // ❌ Unnecessary use of apply

}


{
    // Good Example (using spread)
    const numbers = [1, 2, 3, 4];

console.log(Math.max(...numbers)); // ✅ Cleaner and safer


}


// Note : 

// When is this most useful?
    // Calling variadic functions like Math.max(), console.log(), or any custom function with multiple parameters.
    // Passing arguments dynamically from arrays without manual iteration.

// Key Takeaway
    // Use spread syntax (...array) instead of .apply() whenever you need to pass an array as arguments.
    // Makes code cleaner, safer, and more modern