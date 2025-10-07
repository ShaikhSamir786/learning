//  If the function body consists of a single statement returning an expression without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a return statement. eslint: arrow-parens, arrow-body-style



//  Why follow this rule?

    // Improves readability
        // Short, single-expression arrow functions look cleaner without braces and return.
    // Avoids unnecessary boilerplate
        // No need to write { return x; } when x alone is enough.
    // Clear distinction for side effects
        // If your arrow function does more than return a value (like logging or mutating), braces make it explicit.
    // Consistent style
        // Prevents mixing implicit and explicit returns in the same projec


        {
            //bad
            const prices = [100, 200, 50];
            const pricesWithTax = prices.map((p) => { return p * 1.2; });

console.log(prices); // [100, 200, 50] → original unchanged
console.log(pricesWithTax); // [120, 240, 60]


        }
console.log('------------------------');

        {
            // good
              const prices = [100, 200, 50];
            const pricesWithTax = prices.map(p => p * 1.2);

console.log(prices); // [100, 200, 50] → original unchanged
console.log(pricesWithTax); // [120, 240, 60]
        }