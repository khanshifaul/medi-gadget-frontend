import { GraphQLScalarType, Kind } from "graphql";

export const jsonScalar = new GraphQLScalarType({
  name: "JSON",
  description: "Custom JSON scalar type",
  serialize(value) {
    // Check if the value is a valid JavaScript object or array
    if (value && typeof value === "object") {
      return JSON.stringify(value);
    }
    throw new Error(
      "GraphQL JSON Scalar serializer expected an `object` or `array`"
    );
  },
  parseValue(value) {
    // Ensure the incoming value is a string (JSON format) before parsing
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    throw new Error("GraphQL JSON Scalar parser expected a `string`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return JSON.parse(ast.value); // Parse string literal to JSON object
      } catch {
        throw new Error("Invalid JSON format in literal");
      }
    }
    return null; // Invalid literal
  },
});

export const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Custom DateTime scalar type (ISO 8601 format)",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString(); // Convert Date to ISO string for JSON
    }
    throw new Error(
      "GraphQL DateTime Scalar serializer expected a `Date` object"
    );
  },
  parseValue(value) {
    // Check if the incoming value is a string or number before converting
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value);
    }
    throw new Error(
      "GraphQL DateTime Scalar parser expected a `string` or `number`"
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert string literal to Date
    }
    return null; // Invalid literal
  },
});
