// import "@babel/polyfill";
import _ from "lodash";
import Demo from "@/login";
function component () {
    var element = document.createElement("div");

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(["Hello", "app"], " ");

    return element;
}

document.body.appendChild(component());

new Demo().log();
Promise.resolve("app-1").then(data => console.log(data));
