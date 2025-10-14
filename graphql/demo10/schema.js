const { gql } = require('graphql-tag');

const productsSubgraphSchema = gql`
# --- Federation 2 Setup ---
directive @link(url: String, import: [String]) repeatable on SCHEMA
directive @upper on FIELD_DEFINITION
directive @auth(role: Role) on FIELD_DEFINITION
directive @transformPrice(currency: String = "USD") on FIELD_DEFINITION

enum Role {
  ADMIN
  USER
  GUEST
}

extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",
  import: [
    "@key",
    "@shareable",
    "@external",
    "@requires",
    "@provides",
    "@tag" 
  ]
)
extend schema @link(url: "https://specs.apollo.dev/core/v0.1", import: ["@deprecated"])

# --- Schema Definition ---

type Query {
  "Fetches a product by its unique ID."
  product(id: ID!): Product @auth(role: USER)

  "Lists all available products."
  products(first: Int = 10, after: String): [Product!]! @auth(role: GUEST)

  "Fetches products by category."
  productsByCategory(category: String!): [Product!]!
}

type Product @key(fields: "id") {
  "The unique identifier for the product."
  id: ID!

  "The name of the product."
  name: String! @upper 

  "A brief description of the product."
  description: String

  "The product's current price."
  price: Float! @transformPrice(currency: "EUR") 

  "The current stock quantity of the product."
  stock: Int! @shareable 

  "The main category the product belongs to."
  category: String!

  "The date the product was added to the catalog."
  createdAt: String!

  "Indicates if the product is currently available for purchase."
  isAvailable: Boolean!

  "A URL to the product's main image."
  imageUrl: String

  "The average rating of the product based on reviews."
  averageRating: Float @external 
  "The total number of reviews for the product."
  reviewsCount: Int @external 

  "A flag indicating if the product is no longer actively sold."
  oldSku: String @deprecated(reason: "Use 'id' field instead for product identification.")
}
`;

module.exports = {productsSubgraphSchema}

// In a real Apollo Server setup, you would pass this to ApolloServer's 'typeDefs' property:
// const server = new ApolloServer({
//   typeDefs: productsSubgraphSchema,
//   resolvers,
//   // ... other configuration
// });

// Log the resulting object type (optional, for demonstration)
console.log(productsSubgraphSchema); 
// Output will be a DocumentNode object containing all definitions:
/*
{
  kind: 'Document',
  definitions: [
    { kind: 'DirectiveDefinition', ... },
    { kind: 'EnumTypeDefinition', ... },
    { kind: 'SchemaExtension', ... },
    { kind: 'ObjectTypeDefinition', name: { value: 'Query', ... }, ... },
    { kind: 'ObjectTypeDefinition', name: { value: 'Product', ... }, ... }
  ]
}
*/