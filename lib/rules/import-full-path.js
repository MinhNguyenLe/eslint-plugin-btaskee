"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Import full path",
      recommended: false,
      url: "",
    },
    fixable: 'code',
    schema: [],
    messages: {
      errorFullPath: "Please import full path",
    },
  },
  create(context) {
    function checkFullPath(pathName) {
      const arrayCharacter = Array.from(pathName);

      if (arrayCharacter[0] !== ".") return true;

      let depthLevel = 0
      arrayCharacter.forEach(char => {
        if (char === "/") { depthLevel += 1 }
      })

      if (depthLevel <= 1) return true

      return false
    }

    return {
      ImportDeclaration: (node) => {
        if (!checkFullPath(node.source.value)) {
          return context.report({
            node: node,
            messageId: 'errorFullPath'
          });
        }
      }
    };
  },
};
