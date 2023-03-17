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

function isAsyncFunc(func) {
  return func.async
}

function isMochaEnv(node) {
  return (isMochaStep(node.callee.name) && node.arguments.length === 2)
    || (isMochaHook(node.callee.name) && node.arguments.length === 1)
}

function getMochaCallback(mochaNode) {
  // 2 cases: before & after have 1 arg | describe & it have 2 args
  return mochaNode.arguments.length === 1 ? mochaNode.arguments[0] : mochaNode.arguments[1];
}

function isFuncHaveParam(func, nameExpected) {
  let flag = false;
  func?.params?.forEach(param => {
    if (param.name === nameExpected) flag = true
  })

  return flag;
}

module.exports = {
  isArrowFunc,
  isMochaEnv,
  getMochaCallback,
  isAsyncFunc,
  isFuncHaveParam
}