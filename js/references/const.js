// Use const for all of your references; avoid using var. eslint: prefer-const, no-const-assign

// Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.



// bad example
{
  var total = 10;
  total = 20;
  console.log('bad total ==> ', total);
}

// good example
{
  const total = 10;
  console.log('good total ==> ', total);
}
