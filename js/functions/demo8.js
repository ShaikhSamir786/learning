// Always put default parameters last. eslint:
    // Avoids accidental undefined assignments
    // Clarity and readability


// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}