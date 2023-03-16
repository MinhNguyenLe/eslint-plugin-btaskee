"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  rules: {
    "test": {
      meta: {
        type: "problem",
        docs: {
          description: "i dont know",
          recommended: false,
          url: "",
        },
        fixable: 'code',
        schema: [],
        messages: {
          someMessageId: 'Some error message',
        },
      },
      create(context) {
        console.log(context)

        return {
          onCodePathStart: () => {
            console.log("Starting !")
          },
          CallExpression(node) {
            context.report({
              node,
              messageId: 'someMessageId',
            });
          },
        };
      },
    }
  }
};
