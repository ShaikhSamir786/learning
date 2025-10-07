// In case the expression spans over multiple lines, wrap it in parentheses for better readability

// Why should you wrap multi-line expressions in parentheses?

// Improves readability
    // Makes it immediately clear where the returned expression starts and ends.

// Avoids ambiguity
    // Multi-line returns without parentheses can be misread as having a block body ({}) instead of an expression.

// Consistent style
    // Easier for developers to scan and understand complex implicit returns (e.g., returning an object or JSX).

// Prevents syntax errors
    // JavaScript interprets {} as a block unless you explicitly wrap it



    { 
        // Bad Example (no parentheses, confusing)
    const getUser = () =>
  { name: 'Alice', role: 'admin' }; 
    // ❌ This is a block, not an object!


    // Note : This does not return an object, it creates a block statement. The return value is undefined

    }



    {
        //Good Example (with parentheses)
        const getUser = () => (
  { name: 'Alice', role: 'admin' } // ✅ Clear implicit return of an object
);

    }

