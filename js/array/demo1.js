// Use the literal syntax for array creation. eslint: no-array-constructor


/**
 * Demonstrates the benefits of using array literal syntax (`[]`) over the Array constructor (`new Array()`).
 *
 * Advantages:
 * - Avoids ambiguity with single argument: `new Array(5)` creates an empty array with length 5, not `[5]`.
 * - Improves readability: Array literals are shorter, clearer, and more common.
 * - Ensures consistency: Prevents confusion between `new Array(1, 2, 3)` → `[1, 2, 3]` and `new Array(3)` → empty slots.
 * - Prevents unexpected behavior: Empty slots from `new Array(5)` are skipped in methods like `map()` and `forEach()`.
 * - Better performance: Array literals are slightly faster due to reduced constructor overhead.
 * - Safer autofixes: ESLint can automatically replace `new Array()` with `[]` and `new Array(1,2,3)` with `[1,2,3]`.
 */



// array constructor

const itemarray  = new Array(5)
console.log(itemarray);
console.log("Length of itemarray:", itemarray.length);

console.log('==================================');



// array literal

const itemArray = [2]
console.log(itemArray);
console.log("Length of itemArray:", itemArray.length);
