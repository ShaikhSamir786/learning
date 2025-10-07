// Use Array.from for converting an array-like object to an array

// An array-like object has:
// Indexed elements (0, 1, 2, …)
// A length property
// But it does not have array methods (map, filter, etc.) and may not be iterable.

// {
//     const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
// const arr = [...arrayLike]; // ❌ TypeError: arrayLike is not iterable

//     console.log('arr:', arr); // This line won't be reached due to the error
    

// }

{
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr = Array.from(arrayLike); // ✅ ['a', 'b', 'c']
console.log('arr:', arr); // ✅ ['a', 'b', 'c']
}



const doubled = Array.from({ 0: 10, 1: 20, 2: 30, length: 3 }, x => x * 2);
console.log(doubled); // [20, 40, 60]
