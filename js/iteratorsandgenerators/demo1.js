// Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like for-in or for-of

// Improves readability (declarative vs. imperative)
    // Higher-order functions clearly express what you're doing, not how you're doing it.

// Less boilerplate
    // No need to manually manage indices, iterators, or temporary variables.

// Fewer bugs
    // for-in can iterate over inherited properties (unexpected behavior).
    // for-of can unintentionally mutate arrays or process items incorrectly.

// Easier chaining and transformations
    // Higher-order methods can be chained, making data processing pipelines cleaner.

// Immutable-friendly
    // Loops often encourage mutation (e.g., pushing into arrays), while methods like .map() return new arrays.


    {    //Bad Example (using for-of)


        // Orders with total amount
const orders = [
  { id: 1, total: 200, status: 'pending' },
  { id: 2, total: 450, status: 'shipped' },
  { id: 3, total: 120, status: 'pending' }
];

let pendingOrders = [];
let totalRevenue = 0;

for (const order of orders) { // ❌ Imperative loop
  if (order.status === 'pending') {
    pendingOrders.push(order); // Mutates array
  }
  totalRevenue += order.total;
}

console.log('Pending Orders:', pendingOrders);
console.log('Total Revenue:', totalRevenue);

    }

    console.log('--------------------------');

    {
        //Good Example (using higher-order functions)

        const orders = [
  { id: 1, total: 200, status: 'pending' },
  { id: 2, total: 450, status: 'shipped' },
  { id: 3, total: 120, status: 'pending' }
];

// Filter pending orders
const pendingOrders = orders.filter(order => order.status === 'pending');

// Calculate total revenue
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

console.log('Pending Orders:', pendingOrders);
console.log('Total Revenue:', totalRevenue);


    // Benefits:

        // No manual mutation — returns new arrays/values.
        // Readable and declarative — filter() and reduce() clearly describe intent.
        // Easier to maintain and extend — logic is modular.


    }
    