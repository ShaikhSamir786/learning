//  Never mutate parameters. eslint:  


//  Why should you avoid mutating parameters?

// Unintended side effects
    // When you modify a parameter, you also modify the original variable/object passed in (if it's passed by reference).
    // This can cause bugs in other parts of the code that rely on the original value.

// Breaks function purity
    // Pure functions return new data without altering their inputs.
    // Mutating parameters makes functions harder to reason about and test.

// Confusing code flow
    // Readers may not expect the argument they passed in to change after the function runs.

// Can interfere with default parameters
    // Reassigning parameters can lead to unexpected behavior when default parameter syntax is used


    {
        // bad 
        function updateUser(user) {
  user.isActive = true; // ❌ Mutating the original object
}

const person = { name: 'Alice', isActive: false };
updateUser(person);
console.log(person.isActive); // true → unexpected side effect!

    }


    {
        //Good Example (avoid mutation by returning a new object)
        function updateUser(user) {
  return { ...user, isActive: true }; // ✅ Immutable update
}

const person = { name: 'Alice', isActive: false };
const updatedPerson = updateUser(person);

console.log(person.isActive); // false → original untouched
console.log(updatedPerson.isActive); // true


// What the code does

    // updateUser(user) takes a user object.
    // It creates a new object by copying all properties of the original (...user) and then overrides isActive to true.
    // The original object remains unchanged


    }