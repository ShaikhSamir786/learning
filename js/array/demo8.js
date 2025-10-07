// Use line breaks after opening array brackets and before closing array brackets, if an array has multiple lines

// This is a code style guideline meant to improve readability and maintainability. Adding line breaks after the opening [ and before the closing ] in multi-line arrays makes it easier to:

// Visually scan each element
// Avoid messy diffs in version control
// Add or remove elements without breaking the layout
// Reduce merge conflicts

// Bad
{
    const fruits = ["apple", "banana", "cherry","mango", "pineapple", "grape"];
}
// Good
{
    const fruits = [
        "apple",
        "banana",
        "cherry",
        "mango",
        "pineapple",
        "grape"
    ];
}


// When is this recommended?

// When an array spans multiple lines (3+ elements or long content).
// When elements are long or complex (objects, functions):