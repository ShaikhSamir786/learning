// why  Use array destructuring. eslint: with example

// Using array destructuring is recommended (enforced by ESLint’s prefer-destructuring rule for arrays) because it makes your code:

// Cleaner – avoids repetitive indexing (arr[0], arr[1], etc.).
// More readable – clearly shows the purpose of each position in the array.
// Less error-prone – reduces mistakes with manual index referencing


// bad
{const coordinates = [10, 20, 30];

// Accessing each value manually
const x = coordinates[0];
const y = coordinates[1];
const z = coordinates[2];

console.log(x, y, z); // 10 20 30
}

console.log('--------------------------------------');

// good
{
    const coordinates = [10, 20, 30];

// Destructure values in one step
const [x, y, z] = coordinates;

console.log(x, y, z); // 10 20 30

}

// note = Advanced Array Destructuring like skipping value ,default value, swapping values when to use coordinates tuple etc