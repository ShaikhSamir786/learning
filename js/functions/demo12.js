// Never reassign parameters. 

{
    // bad

    // bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

}



{
    // good 

    function f3(a) {
  return  b = a || 1;
 
}console.log( f3(5))

}