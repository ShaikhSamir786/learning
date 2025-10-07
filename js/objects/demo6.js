// Don't put quotes around property names if they are valid JavaScript identifiers.

// Put quotes only when the property name is not a valid identifier (e.g., it has spaces, starts with a number, or contains special characters)

//bad
{
    const person = {
  "name": "Alice",
  "age": 25,
  "city": "New York"
};

console.log(person);

}
//This is valid but unnecessarily quotes all keys.

console.log('===========================================');


//good

{
  const person = {
    name: "Alice",   // no quotes, valid identifier
    age: 25,         // no quotes, valid identifier
    "city-name": "New York" // quoted, because it has a hyphen
  };

  console.log(person);

}






// console.log(person);
