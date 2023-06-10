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
    function isSameFolder(arrayCharacter) {
      return arrayCharacter[0] === "." && arrayCharacter[1] === "/"
    }

    function isFullPathCorrectly(arrayCharacter) {
      return arrayCharacter[0] !== "."
    }

    function isSingleDepthLevel(arrayCharacter){
      let depthLevel = 0
      arrayCharacter.forEach(char => {
        if (char === "/") { depthLevel += 1 }
      })

      return depthLevel <= 1;
    }

    function checkFullPath(pathName) {
      const arrayCharacter = Array.from(pathName);

      if (isSameFolder(arrayCharacter) || isFullPathCorrectly(arrayCharacter)) return true;

      return isSingleDepthLevel(arrayCharacter);
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
