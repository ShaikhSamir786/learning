// Avoid confusing arrow function syntax (=>) with comparison operators (<=, >=). eslint

// Why does this matter?

// Readability issues
    // => (arrow function) can look very similar to >= or <= (comparison operators), especially in complex conditions.

// Potential logic errors
    // Developers may think they are writing a comparison, but accidentally create an arrow function.

// Hard-to-debug bugs
    // Code may run without errors but behave incorrectly.

// Linting helps catch ambiguous syntax
    // ESLint flags these cases to force parentheses or better formatting.

{
    // ❌ Bad 
    const scores = [78, 92, 85, 95, 67, 100];
const highScores = scores.filter(score => score >= 90);
console.log("High Scores (90+):", highScores);
}

    console.log('------------------------');
    


{ 
    // ✅ Good (clear)
    const scores = [78, 92, 85, 95, 67, 100];
const highScores = scores.filter((score) => score >= 90);
console.log("High Scores (90+):", highScores);

}