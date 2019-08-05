import _ from "lodash";
import "@/assets/css/index.css"
import "@/assets/sass/index.scss"
// import "@/assets/iconfont/mobirise/style.css";
import testImage from "@/assets/images/test.png";
import { add } from "@/util";
add(1, 2)
function component1 () {
    var element = document.createElement("div");

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(["Hello", "webpack"], " ");


    return element;
}

const img = document.createElement('img');
img.src = testImage;
document.body.appendChild(img);
document.body.appendChild(component1());

class Demo {
    log () {
        console.log("index");
    }
}
new Demo().log();
Promise.resolve("index").then(data => console.log(data));
