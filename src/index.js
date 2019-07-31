// import "@babel/polyfill";
import _ from "lodash";
function component() {
  var element = document.createElement("div");

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());

class Demo {
  log() {
    console.log("index");
  }
}
new Demo().log();
Promise.resolve("index").then(data => console.log(data));
