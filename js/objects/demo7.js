//  Do not call Object.prototype methods directly,
//  such as hasOwnProperty, propertyIsEnumerable, and isPrototypeOf. eslint



// hasownproperty not safe -- its allow override method
// hasown -- safe its do not allow override method

{
// bad method
const obj = { name: "John" };
obj.hasOwnProperty("name"); // true
obj.hasOwnProperty("toString"); // false (inherited from Object.prototype)


// another method

console.log(Object.prototype.propertyIsEnumerable.call(obj, "hidden")); 

// good method
Object.hasOwn(obj, "name"); // true

}

{
    const obj = { name: "John" };
obj.propertyIsEnumerable("name"); // true
obj.propertyIsEnumerable("toString"); // false
}



function Person() {}
const person = new Person();
Person.prototype.isPrototypeOf(person); // true
Object.prototype.isPrototypeOf(person); // true



// Note : also we can use external Package named Lodash 
// and Playcode.io for coding