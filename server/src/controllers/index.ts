const userAuth = require("./userAuth");
const taskData = require("./taskData");

function controllersFactory() {
  return {
    userAuth,
    taskData,
  };
}

export { controllersFactory };
