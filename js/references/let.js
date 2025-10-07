// If you must reassign references, use let instead of var. eslint: no-var

// Why? let is block-scoped rather than function-scoped like var

// bad // not run -- because var is not block-scoped 
{var name = 'Alice';
if (true) {
    name = 'Bob';
}
console.log('bad name ==> ', name);
}

// good, use let. -- this will run correctly because let is block-scoped
{let name = 'Alice';
if (true) {
    name = 'Bob';
}
console.log('good name ==> ', name);}