// Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item.


{
 
    // bad
    function foo(bar,
             baz,
             quux) {
  // ...
}

console.log(foo,
  bar,
  baz);
    

}


{
    // good

    function foo(
  bar,
  baz,
  quux,
) {
  // ...
}



console.log(
  foo,
  bar,
  baz,
);

}