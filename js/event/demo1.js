// why When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass an object literal (also known as a "hash") instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead 



// Why use an object literal (hash) instead of a raw value in event payloads?

// Extensibility
    // If you pass a raw value (like a string or number), you can only pass one thing.
    // Later, if you need to pass more data, you must refactor all event listeners.
    // With an object, you can just add new keys without breaking existing handlers.

// Clarity & semantics
    // An object describes what the data means, not just the value.
    // Handlers become self-documenting (e.g., { userId: 123 } is clearer than just 123).

// Consistency
    // Always emitting an object makes the event API predictable.
    // Consumers don’t need to remember whether a payload is a string, number, or something else.

// Easier debugging & maintenance
    // Objects can carry multiple related fields, making logs and inspections more meaningful.


    {
        // Bad Example (raw value payload)
// Example of using an object literal in an event payload// Emitting a raw value
button.addEventListener('click', () => {
  const userId = 42;
  document.dispatchEvent(new CustomEvent('user:selected', { detail: userId }));
});

// Listener
document.addEventListener('user:selected', (e) => {
  console.log(`User selected: ${e.detail}`); // Only userId available
});



}

{
    // Good Example (object payload)
    // Emitting an object payload
button.addEventListener('click', () => {
  const user = { id: 42, name: 'Alice' };
  document.dispatchEvent(new CustomEvent('user:selected', { detail: { user } }));
});

// Listener
document.addEventListener('user:selected', (e) => {
  const { user } = e.detail;
  console.log(`User selected: ${user.id} (${user.name})`);
});

}

// ✅ Key Takeaway
    // Always send event payloads as objects, even if it’s just one property.
    // Makes your code extensible, consistent, and safer for future changes.