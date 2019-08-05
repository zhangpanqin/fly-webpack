"use strict";

function asyncGeneratorStep (gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator (fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next (value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw (err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _instanceof (left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck (instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function component () {
    var element = document.createElement("div"); // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的

    return element;
}

document.body.appendChild(component());

var Demo =
    /*#__PURE__*/
    function () {
        function Demo () {
            _classCallCheck(this, Demo);
        }

        _createClass(Demo, [{
            key: "log",
            value: function log () {
                var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "login-Demo";
                console.log(name);
            }
        }]);

        return Demo;
    }();

var map = new Map();
map.set(name, 1);
console.log(map);

var testAsync =
    /*#__PURE__*/
    function () {
        var _ref = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee () {
                return regeneratorRuntime.wrap(function _callee$ (_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return Promise.resolve().then(function (data) {
                                    return console.log(111);
                                });

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            }));

        return function testAsync () {
            return _ref.apply(this, arguments);
        };
    }();

testAsync();
Promise.resolve("app").then(function (data) {
    return console.log(data);
});