// Use object destructuring for multiple return values, not array destructuring.

// Why prefer object destructuring for multiple return values?

// Order-independent – You don't need to remember the exact order of returned values.
// Self-documenting – The property names describe the data.
// Easier to extend – Adding new return values won’t break existing code.
// Safer – Less chance of accidentally swapping variables


// bad
{
    function getPerson() {
  return [25, "Alice", "Johnson"];
}

const [first, last, age] = getPerson();
console.log(`${first} ${last} is ${age}`); // ❌ 25 Alice is Johnson


// Problems:
// Relies on the order of values (name → age → country).
// If you later change the function to return [25, "Alice", "USA"];, your code breaks silently.


} 

console.log('--------------------------------------');


// good

// Advantages:

// Order doesn’t matter.
// Easier to see what each value represents.



{
    function getPerson() {
  return { firstName: "Alice", lastName: "Johnson", age: 25 };
}

const { firstName, lastName, age } = getPerson();
console.log(`${firstName} ${lastName} is ${age}`); // ✅ Alice Johnson is 25

}
console.log('--------------------------------------');


// Can selectively extract only what you need:

{
const { age } = getPerson();
console.log(age); // 25
}

console.log('--------------------------------------');


// advance - Using Both Object & Array Destructuring Togethe

{
    function getUserProfile() {
  return {
    name: "Alice",
    hobbies: ["reading", "traveling", "coding"],
  };
}

// Destructure object + array together
const { name, hobbies: [firstHobby, secondHobby] } = getUserProfile();

console.log(name);         // Alice
console.log(firstHobby);   // reading
console.log(secondHobby);  // traveling

}