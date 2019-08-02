// import "@babel/polyfill";
import _ from "lodash";
import Util from '#/util';
function component () {
    var element = document.createElement("div");

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(["Hello", "app"], " ");

    return element;
}
Util.login();
document.body.appendChild(component());

class Demo {
    log (name = "login-Demo") {
        console.log(name);
    }
}
Promise.resolve("app").then(data => console.log(data));
export default Demo;
