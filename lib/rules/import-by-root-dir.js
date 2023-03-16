"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Import by root dir",
      recommended: false,
      url: "",
    },
    fixable: 'code',
    schema: [],
    messages: {
      recommend: 'Recommend import by root dir, not use "/../.." of Meteor',
    },
  },
  create(context) {
    return {
      ImportDeclaration: (node) => {
        if (Array.from(node.source.value)[0] === "/") {
          return context.report({
            node: node,
            messageId: 'recommend'
          });
        }
      }
    };
  },
};
