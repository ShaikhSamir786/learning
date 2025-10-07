// Do not unnecessarily escape characters in strings. eslint

// Why avoid unnecessary escapes?

// Reduces code clutter – Extra backslashes (\) make code harder to read.
// Can cause confusion – Developers may think the character has special meaning when it doesn’t.
// Potential bugs – Over-escaping may change the meaning of your string or regex.

{
    // bad
    // Escaping quotes that don't need escaping
const message = 'Hello\, world\!'; // ❌

const url = "https:\/\/example.com"; // ❌

const regex = /\!/; // ❌ Escaping "!" is not needed

console.log('message:', message , 'url:', url, 'regex:', regex);


}

console.log('-------------------------');


{
    // good
    const message = 'Hello, world!'; // ✅ No escaping needed

const url = "https://example.com"; // ✅ Clean

const regex = /!/; // ✅ Correct

console.log('message:', message , 'url:', url, 'regex:', regex);

}