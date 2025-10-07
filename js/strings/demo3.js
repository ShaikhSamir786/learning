// When programmatically building up strings, use template strings instead of concatenation. eslint: prefer-template template-curly-spacing

{
    // bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}
}

{
    // bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

}

{
    // good
function sayHi(name) {
  return `How are you, ${name}?`;
}
}