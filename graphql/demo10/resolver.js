const { GraphQLError } = require('graphql');
const { MapperKind } = require('@graphql-tools/utils');


const resolvers = {
  // ----------------------------------------------------
  // 2.1. Type Resolvers (for Federation)
  // ----------------------------------------------------
  Product: {
    /**
     * Required by Apollo Federation for resolving entities when referenced
     * by other subgraphs (e.g., the Reviews subgraph asks for a Product by its ID).
     * The argument `reference` will contain the fields specified in @key (i.e., { id: "101" }).
     */
    __resolveReference(reference) {
      console.log(`[Product Resolver] Resolving entity with ID: ${reference.id}`);
      return MOCK_PRODUCTS.find(p => p.id === reference.id);
    },

    /**
     * NOTE on @external fields: averageRating and reviewsCount
     * These fields are NOT implemented here. They are marked @external,
     * meaning they are resolved by the Reviews subgraph.
     * The Product type resolver handles the *identity* of the entity,
     * and the Router handles fetching these external fields.
     */
  },

  // ----------------------------------------------------
  // 2.2. Query Resolvers (Standard GraphQL)
  // ----------------------------------------------------
  Query: {
    product(_, { id }) {
      return MOCK_PRODUCTS.find(p => p.id === id);
    },
    
    products() {
      // In a real app, you would handle `first` and `after` arguments for pagination
      return MOCK_PRODUCTS;
    },
    
    productsByCategory(_, { category }) {
      return MOCK_PRODUCTS.filter(p => p.category === category);
    },
  },

  // ----------------------------------------------------
  // 2.3. Custom Directive Resolvers (Middleware)
  // ----------------------------------------------------
  /**
   * IMPORTANT: Directive resolvers are registered separately in Apollo Server setup,
   * but their logic is shown here for clarity. In a production app, you would use
   * the @graphql-tools/schema package to apply schema transforms.
   */
};

// --- Custom Directive Logic (Simulated implementation for server setup) ---

/**
 * 1. @upper Directive Logic: Converts a string field value to uppercase.
 */
function upperDirectiveTransformer(schema, directiveName) {
  return new (require('@graphql-tools/utils').MapperKind)({
    [require('@graphql-tools/utils').MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const fieldDirectives = fieldConfig.astNode.directives.filter(d => d.name.value === directiveName);
      if (fieldDirectives.length > 0) {
        const originalResolver = fieldConfig.resolve || ((source) => source[fieldName]);
        fieldConfig.resolve = async (source, args, context, info) => {
          const result = await originalResolver(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    }
  }).mapSchema(schema);
}

/**
 * 2. @auth Directive Logic: Checks the user role against the required role argument.
 */
function authDirectiveTransformer(schema, directiveName, context) {
  return new (require('@graphql-tools/utils').MapperKind)({
    [require('@graphql-tools/utils').MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const authDirective = fieldConfig.astNode.directives.find(d => d.name.value === directiveName);
      if (authDirective) {
        // Extract the required role from the directive arguments
        const requiredRole = authDirective.arguments.find(arg => arg.name.value === 'role').value.value;

        const originalResolver = fieldConfig.resolve || ((source) => source[fieldName]);
        fieldConfig.resolve = (source, args, ctx, info) => {
          // Access the user role from the context object (simulated)
          const userRole = ctx.user.role;

          if (userRole === 'ADMIN' || userRole === requiredRole) {
            return originalResolver(source, args, ctx, info);
          }
          
          throw new (require('graphql').GraphQLError)(
            `Unauthorized: Must have role ${requiredRole}`,
            { extensions: { code: 'FORBIDDEN' } }
          );
        };
        return fieldConfig;
      }
    }
  }).mapSchema(schema);
}

/**
 * 3. @transformPrice Directive Logic: Converts price to the specified currency.
 */
function transformPriceDirectiveTransformer(schema, directiveName) {
  return new (require('@graphql-tools/utils').MapperKind)({
    [require('@graphql-tools/utils').MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const priceDirective = fieldConfig.astNode.directives.find(d => d.name.value === directiveName);
      if (priceDirective) {
        // Extract the target currency from the directive arguments
        const currencyArg = priceDirective.arguments.find(arg => arg.name.value === 'currency');
        const targetCurrency = currencyArg ? currencyArg.value.value : 'USD'; // Default to USD if argument is missing

        const originalResolver = fieldConfig.resolve || ((source) => source[fieldName]);
        fieldConfig.resolve = (source, args, ctx, info) => {
          const originalPrice = originalResolver(source, args, ctx, info);
          
          if (targetCurrency === 'EUR') {
            const rate = ctx.exchangeRates.USD_TO_EUR;
            return parseFloat((originalPrice * rate).toFixed(2));
          }
          // Default: return original price (assuming it's in USD)
          return originalPrice;
        };
        return fieldConfig;
      }
    }
  }).mapSchema(schema);
}

const MOCK_PRODUCTS = [
  { id: '101', name: 'Wireless Mechanical Keyboard', description: 'Clicky keys and no cables.', price: 150.00, stock: 50, category: 'Electronics', createdAt: '2023-01-15', isAvailable: true, oldSku: 'KBD-W-01', averageRating: 4.5, reviewsCount: 120 },
  { id: '102', name: 'Ergonomic Office Chair', description: 'Supports your back during long sessions.', price: 499.99, stock: 10, category: 'Furniture', createdAt: '2023-02-20', isAvailable: true, oldSku: 'CHR-E-05', averageRating: null, reviewsCount: 0 },
  { id: '103', name: 'Noise-Cancelling Headphones', description: 'Tune out the world.', price: 299.00, stock: 0, category: 'Electronics', createdAt: '2023-03-01', isAvailable: false, oldSku: 'HDP-N-02', averageRating: 4.8, reviewsCount: 55 }
];

// Helper to simulate a user/context object (e.g., from an authentication layer)
const MOCK_CONTEXT = {
  // This role would come from an authentication token
  user: {
    role: 'ADMIN', // Change to 'USER' or 'GUEST' to test the @auth directive
  },
  // Simple mock for exchange rate
  exchangeRates: {
    USD_TO_EUR: 0.92,
  }
};

// In a real application, you would export the resolvers
module.exports = { resolvers, upperDirectiveTransformer, authDirectiveTransformer, transformPriceDirectiveTransformer, MOCK_CONTEXT };