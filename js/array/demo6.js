//  Use Array.from instead of spread ... for mapping over iterables, because it avoids creating an intermediate array

// The key reason is performance and efficiency:

// When you use spread ([...]) with .map(), you first create an array using spread and then create another new array with .map().

{
    const numbers = new Set([1, 2, 3, 4]);

// Spread first (creates an array), then map (creates another array)
const doubled = [...numbers].map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8]

}

console.log('==================================');



// Array.from() can do both steps at once, avoiding the extra intermediate array

{
    const numbers = new Set([1, 2, 3, 4]);

// Convert and map in one step
const doubled = Array.from(numbers, n => n * 2);

console.log(doubled); // [2, 4, 6, 8]

}