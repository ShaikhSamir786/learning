// Use single quotes '' for strings. eslint: quotes

// Why prefer single quotes?

// Consistency – Makes code easier to read and maintain when everyone uses the same style.
// Less escaping needed – Double quotes (") often appear in HTML attributes or JSON, so using single quotes reduces the need to escape them.
// Widespread convention – Most JavaScript style guides (Airbnb, StandardJS, ESLint defaults) prefer single quotes for strings.
// Cleaner diffs in version control – Consistent quoting avoids unnecessary changes in Git diffs.

// bad
{const name = "Capt. Janeway";
}
// bad - template literals should contain interpolation or newlines
{const name = `Capt. Janeway`;
}
// good
{const name = 'Capt. Janeway';
}

