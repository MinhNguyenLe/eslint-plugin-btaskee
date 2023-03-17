"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Catch error function must be handle",
      recommended: false,
      url: "",
    },
    fixable: 'code',
    schema: [],
    messages: {
      mustBeHandle: "Catch error function must be handle",
    },
  },
  create(context) {
    return {
      CatchClause: (node) => {
        if (!node.body.body.length) {
          return context.report({
            node: node,
            messageId: 'mustBeHandle'
          });
        }
      }
    };
  },
};
