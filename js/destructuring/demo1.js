// why Use object destructuring when accessing and using multiple properties of an object. eslint: prefer-destructuring with example


//This rule — prefer-destructuring in ESLint — encourages the use of object destructuring because it makes your code:

// Cleaner and shorter (less repetition)
// More readable (clearly shows which properties are used)
// Less error-prone (avoids repeatedly accessing the same object) 

// bad 

// bad
{
  function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`
};
}

// good
{function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}
}
// best
{function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}}