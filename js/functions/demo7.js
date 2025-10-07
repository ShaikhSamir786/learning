// Avoid side effects with default parameters.

// Why avoid side effects in default parameters?

// Default parameters should only define defaults

// They should not execute logic that mutates variables, calls APIs, or alters the environment.

// Makes behavior predictable

// Default parameters run every time the function is called without that argument, so side effects may unintentionally repeat.

// Harder to debug

// Side effects in defaults are less visible than side effects in the function body.

// Breaks functional purity

// Default parameters should remain declarative, not imperative.


{
    //Bad Example (side effect in default parameter)
    let counter = 0;

function logMessage(message = `Log count: ${++counter}`) { // ❌ side effect
  console.log(message);
}

logMessage(); // Log count: 1
logMessage(); // Log count: 2 → side effect happening unintentionally


// Note : Here, the default parameter increments counter each time you call the function without a message.
}


{

    // Good Example (no side effects in default parameter)
    let counter = 0;

function logMessage(message) {
  if (message === undefined) {
    message = `Log count: ${counter + 1}`; // ✅ handled inside, no hidden mutation
  }
  console.log(message);
}

}