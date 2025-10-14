import { GraphQLError } from 'graphql';
import { mapSchema , MapperKind } from '@graphql-tools/utils';

// --- Imports and Mock Data ---
import { pubsub, EVENT_CREATED } from "./pubsub.js";

export let events = [];

// This object is merged into the context for Queries and Mutations
export const MOCK_CONTEXT = {
  // Change 'USER' to 'ADMIN' or any other Role to test the @auth directive
  user: { role: 'USER' }, 
};

// --- Core Resolvers ---
export const resolvers = {
  // Resolver for the deprecated field
  Event: {
    oldId: (parent) => parent.id,
  },

  Query: {
    events: () => events,
  },

  Mutation: {
    createEvent: async (_, { title, description }) => {
      const newEvent = {
        id: String(events.length + 1), 
        title,
        description: description || '',
        createdAt: new Date().toISOString(),
      };
      events.push(newEvent);

      await pubsub.publish(EVENT_CREATED, { eventCreated: newEvent });

      console.log(`📢 New event created: ${newEvent.title}`);
      return newEvent;
    },
  },

  Subscription: {
    eventCreated: {
      subscribe: (_, __, ctx) => {
        return ctx.pubsub.asyncIterator([EVENT_CREATED]); 
      },
    },
  },
};


// --- Custom Directive Transformers ---

export function upperDirectiveTransformer(schema, directiveName = 'upper') {
  const typeVisitor = {
    // We target every FIELD_DEFINITION in the schema
    [MapperKind.FIELD_DEFINITION]: (fieldConfig, fieldName, typeName) => {
      // Check if the field has the @upper directive applied
      const fieldDirectives = fieldConfig.astNode.directives.filter(d => d.name.value === directiveName);
      
      if (fieldDirectives.length > 0) {
        const originalResolver = fieldConfig.resolve || ((source) => source[fieldName]);
        
        // Wrap the resolver to apply uppercase conversion
        fieldConfig.resolve = async (source, args, context, info) => {
          const result = await originalResolver(source, args, context, info);
          if (typeof result === 'string') {
            console.log(`[Directive @${directiveName}] Transforming ${fieldName} to uppercase.`);
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    }
  };
  
  // Apply the visitor object to the schema using mapSchema
  return mapSchema(schema, typeVisitor);
}


export function authDirectiveTransformer(schema, directiveName = 'auth', mockContext) {
  const typeVisitor = {
    // We target every FIELD_DEFINITION in the schema
    [MapperKind.FIELD_DEFINITION]: (fieldConfig, fieldName, typeName) => {
      // Check if the field has the @auth directive applied
      const authDirective = fieldConfig.astNode.directives.find(d => d.name.value === directiveName);
      
      if (authDirective) {
        // Get the required role from the schema directive argument
        const requiredRole = authDirective.arguments.find(arg => arg.name.value === 'role').value.value;

        const originalResolver = fieldConfig.resolve || ((source) => source[fieldName]);

        // Wrap the resolver for authorization
        fieldConfig.resolve = (source, args, ctx, info) => {
          // Use the user role passed via the context
          const userRole = (ctx.user || mockContext.user).role; 

          if (userRole === 'ADMIN' || userRole === requiredRole) {
            console.log(`[Directive @${directiveName}] Access granted for ${userRole} on ${fieldName}.`);
            return originalResolver(source, args, ctx, info);
          }
          
          console.warn(`[Directive @${directiveName}] Access denied. User role: ${userRole}, Required: ${requiredRole}`);
          throw new GraphQLError(
            `Unauthorized: Must have role ${requiredRole}`,
            { extensions: { code: 'FORBIDDEN' } }
          );
        };
        return fieldConfig;
      }
    }
  };

  // Apply the visitor object to the schema using mapSchema
  return mapSchema(schema, typeVisitor);
}