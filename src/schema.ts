// =============================================================================================================================
// SRC - SCHEMA
// =============================================================================================================================
// tslint:disable: object-literal-sort-keys
export default {
  type: "object",
  properties: {
    sizeLimit: {
      type: "number",
    },
    jsx: {
      type: "boolean",
    },
    fallback: {
      anyOf: [
        { type: "string" },
        {
          type: "object",
          properties: {
            loader: { type: "string" },
            options: {
              anyOf: [{ type: "object" }, { type: "string" }],
            },
          },
          additionalProperties: false,
        },
      ],
    },
  },
  additionalProperties: true,
};
// tslint:enable:object-literal-sort-keys
