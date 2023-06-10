"use strict";

const {
  isAsyncFunc,
  getMochaCallback,
  isMochaEnv,
  isFuncHaveParam
} = require("../utils");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "In Mocha testing, async step must to call done()",
      recommended: false,
      url: "",
    },
    fixable: 'code',
    schema: [],
    messages: {
      asyncNeedToDone: "In Mocha testing, async step must to call done()",
    },
  },
  create(context) {
    return {
      CallExpression: (node) => {
        if(isMochaEnv(node)){
          const callback = getMochaCallback(node);

          if (isAsyncFunc(callback) && !isFuncHaveParam(callback, "done")) {
            return context.report({
              node: node,
              messageId: 'asyncNeedToDone'
            });
          }
        }
      }
    };
  },
};
