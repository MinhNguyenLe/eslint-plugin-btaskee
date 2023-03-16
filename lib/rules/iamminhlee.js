"use strict";

module.exports = {
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
};
