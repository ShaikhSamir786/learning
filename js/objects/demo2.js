
// Use computed property names when creating objects with dynamic property names.

// Why? They allow you to define all the properties of an object in one place.


// Example: Using computed property names to create an object with dynamic keys

function makeKey(prefix, value) {
    return `${prefix}_${value}`;
}

// Without computed property names (less readable)
{
    const user = {
        id: 1,
        name: 'Alice',
    };
    user[makeKey('role', 'manager')] = true; // Add property after object creation
    console.log(user); // { id: 1, name: 'Alice', role_admin: true }
}

// With computed property names (preferred)
{
    const user = {
        id: 1,
        name: 'Alice',
        [makeKey('role', 'admin')]: true, // Property defined inline
    };
    console.log(user); // { id: 1, name: 'Alice', role_admin: true }
}
