// To convert an iterable object to an array, use spreads ... instead of Array.from

// What’s an Iterable?

// An iterable is anything you can loop over with for...of.
// Examples:
// NodeList (like from document.querySelectorAll())
// Map, Set ,
// Strings Arguments object (function foo(){console.log(arguments);})
// document.querySelectorAll('.foo') returns a NodeList, which is not a real array


// html content for testing


/*
<div class="foo">One</div>
<div class="foo">Two</div>
<div class="foo">Three</div>
*/




// array from -- Why use this?
//You can transform elements during conversion (el => el.textContent).
{
const foo = document.querySelectorAll('.foo'); // NodeList (not an array)
// Convert to array using Array.from()
const nodes = Array.from(foo);
// Example: map each element to its text content
const texts = Array.from(foo, el => el.textContent);
console.log(nodes); // [div.foo, div.foo, div.foo]
console.log(texts); // ["One", "Two", "Three"]
}

// sprseads ... -- Why use this? Shorter, cleaner syntax when you just want a plain array. wwe can use mapping
{
const foo = document.querySelectorAll('.foo'); // NodeList

// Convert to array using spread
const nodes = [...foo];

// Example: extract text content after conversion
const texts = nodes.map(el => el.textContent); // .map( x = x*2) works on real arrays

console.log(nodes); // [div.foo, div.foo, div.foo]
console.log(texts); // ["One", "Two", "Three"]
}
