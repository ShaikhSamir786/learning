// Use property value shorthand. eslint: object-shorthand

// Why? It is shorter and descriptive

const lukeSkywalker = 'hello object-shorthand';

// bad
{
    const obj = {
  lukeSkywalker: lukeSkywalker,
};

console.log(lukeSkywalker)
}

// good 
{
  const obj = {
  lukeSkywalker,
};

console.log(lukeSkywalker)
}