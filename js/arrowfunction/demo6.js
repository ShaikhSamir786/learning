//  Enforce the location of arrow function bodies with implicit returns. eslint


// Why enforce this?

// Prevents ambiguous returns
    // Misplaced line breaks can make JavaScript interpret the function differently (e.g., returning undefined instead of an object).

// Improves readability
    // Consistent formatting makes it clear where the return value starts and ends.

// Reduces syntax errors
    // Improper line breaks after => may cause unintended automatic semicolon insertion (ASI).

// Encourages cleaner code style
    // Teams can choose to keep expressions inline or always start them on the next line.

    {
        // Bad Example (ambiguous)
        // Looks like it's returning an object, but it actually returns undefined
const getUser = () =>
{ name: 'Alice', age: 25 };

    }


    {
        //Good Example (consistent implicit return)
        const getUser = () => (
  { name: 'Alice', age: 25 }
);

    }