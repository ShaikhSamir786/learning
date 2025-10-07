// Use the literal syntax for object creation. eslint: no-new-object
// Example of object creation using literal syntax

// Bad object creation (avoid using 'new Object()')
// const obj = new Object();

// Good object creation
const item = {
    name: "Notebook",
    price: 12.99,
    inStock: true
};

// Accessing properties
console.log(item.name);      // "Notebook"
console.log(item.price);     // 12.99
console.log(item.inStock);   // true