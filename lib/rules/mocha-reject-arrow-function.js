"use strict";

const {
  isArrowFunc,
  isMochaEnv,
  getMochaCallback
} = require('../utils');

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Reject arrow function in Mocha environment",
      recommended: false,
      url: "",
    },
    fixable: 'code',
    schema: [],
    messages: {
      rejectArrowFunc: "In Mocha, must to use function(){}, reject Arrow function",
    },
  },
  create(context) {
    return {
      CallExpression: (node) => {
        if(isMochaEnv(node)){
          if (isArrowFunc(getMochaCallback(node).type)) {
            return context.report({
              node: node,
              messageId: 'rejectArrowFunc'
            });
          }
        }
      }
    };
  },
};
