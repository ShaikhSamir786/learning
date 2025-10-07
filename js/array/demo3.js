 // Use array spreads ... to copy arrays.


 // It’s Only a Shallow Copy
// If items contains primitive values (numbers, strings, booleans), this is fine.
// But if items contains objects or arrays, both items and itemsCopy will point to the same nested objects


const items = [{ x: 1 }, { y: 2 }];
const itemsCopy = [];

for (let i = 0; i < items.length; i++) {
  itemsCopy[i] = items[i];
}

itemsCopy[0].x = 99;
console.log('itemsCopy[0].x); // ✅ 99' , itemsCopy[0].x); // ✅ 99);

console.log(items[0].x); // ❌ 99 (changed original too!)

console.log('==================================');


// good way to copy an array
// items1 contains two objects, not just numbers or strings.
// const itemsCopy1 = [...items1]; copies the array structure, but not the objects inside.
// It creates a new array, but the objects are still shared references.
//When you modify itemsCopy1[0].x, you're modifying the same object that also exists in items1[0].


const items1 = [{ x: 1 }, { y: 2 }];
const itemsCopy1 = [...items1];

itemsCopy1[0].x = 99;
console.log('items1[0].x) ', items1[0].x); // ❌ 99 (changed original too!);

console.log('itemsCopy1[0].x); // ✅ 99' , itemsCopy1[0].x); // ✅ 99);
