"use strict";

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
    function isMochaStep(funcName) {
      return funcName === "describe"
        || funcName === "it"
    }

    function isMochaHook(funcName) {
      return funcName === "beforeEach"
        || funcName === "afterEach"
        || funcName === "before"
        || funcName === "after"
        || funcName === "beforeAll"
        || funcName === "afterAll";
    }

    function isArrowFunc(funcType) {
      return funcType === "ArrowFunctionExpression";
    }

    return {
      CallExpression: (node) => {
        const funcName = node.callee.name;

        if (isMochaStep(funcName) && node.arguments.length === 2 && isArrowFunc(node.arguments[1].type)) {
          return context.report({
            node: node,
            messageId: 'rejectArrowFunc'
          });
        }

        if (isMochaHook(funcName) && node.arguments.length === 1 && isArrowFunc(node.arguments[0].type)) {
          return context.report({
            node: node,
            messageId: 'rejectArrowFunc'
          });
        }
      }
    };
  },
};
