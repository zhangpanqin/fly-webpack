import _ from "lodash";
function component () {
    var element = document.createElement("div");

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(["Hello", "app"], " ");

    return element;
}
document.body.appendChild(component());

class Demo {
    log (name = "login-Demo") {
        console.log(name);
    }
}
const map = new Map();
map.set(name, 1);
console.log(map);

console.log(Object.assign({}, { name: "测试Object.assign" }));

const testAsync = async function () {
    await Promise.resolve().then(data => console.log(111));
}
testAsync();
Promise.resolve("app").then(data => console.log(data));
export default Demo;
