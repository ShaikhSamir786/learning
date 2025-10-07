// When you must use an anonymous function (as when passing an inline callback), use arrow function notation. eslint: prefer-arrow-callback, arrow-spacing

// Lexical this binding
// Arrow functions don’t create their own this, they inherit it from their surrounding scope.
// Traditional function creates its own this, which often leads to unexpected behavior in callbacks.

// Avoids common bugs
    // No need to use .bind(this) or assign const self = this;.

// More concise syntax
// Improved readability

// Key Takeaway
// Use arrow functions for inline callbacks to avoid this binding issues and improve readability.
// Only use regular functions when you need a new this context, like in class methods or constructors.

{
  // bad
  function User(name) {
  this.name = name;
}

User.prototype.sayName = function () {
  setTimeout(function () {
    console.log(this.name); 
    //Inside setTimeout, this does not refer to the User instance (Alice).
    
    // ❌ undefined (or window.name)
  }, 1000);
};

new User('Alice').sayName();

}

{
  //good
  function User(name) {
  this.name = name;
}

User.prototype.sayName = function () {
  setTimeout(() => {
    console.log(this.name); // ✅ Alice
  }, 1000);
};


new User('Alice').sayName();

}
