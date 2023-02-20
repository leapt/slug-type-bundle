'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stimulus = require("@hotwired/stimulus");
var _slugify = _interopRequireDefault(require("slugify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_slugify["default"].extend({
  "$": "",
  "%": "",
  "&": "",
  "<": "",
  ">": "",
  "|": "",
  "¢": "",
  "£": "",
  "¤": "",
  "¥": "",
  "₠": "",
  "₢": "",
  "₣": "",
  "₤": "",
  "₥": "",
  "₦": "",
  "₧": "",
  "₨": "",
  "₩": "",
  "₪": "",
  "₫": "",
  "€": "",
  "₭": "",
  "₮": "",
  "₯": "",
  "₰": "",
  "₱": "",
  "₲": "",
  "₳": "",
  "₴": "",
  "₵": "",
  "₸": "",
  "₹": "",
  "₽": "",
  "₿": "",
  "∂": "",
  "∆": "",
  "∑": "",
  "∞": "",
  "♥": "",
  "元": "",
  "円": "",
  "﷼": ""
});
var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);
  var _super = _createSuper(_default);
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "locked", true);
    _defineProperty(_assertThisInitialized(_this), "field", void 0);
    _defineProperty(_assertThisInitialized(_this), "target", void 0);
    _defineProperty(_assertThisInitialized(_this), "currentSlug", void 0);
    return _this;
  }
  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      this.field = this.element.querySelector('input');
      this.field.setAttribute('readonly', 'readonly');
      this.setTargetElement();
      if ('' === this.field.value) {
        this.currentSlug = '';
        this.updateValue();
        this.listenTarget();
      } else {
        this.currentSlug = this.field.value;
      }
      this.appendLockButton();
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.field.value = (0, _slugify["default"])(this.target.value, {
        remove: /[^A-Za-z0-9\s-]/g,
        lower: true,
        strict: true
      });
    }
  }, {
    key: "listenTarget",
    value: function listenTarget() {
      var _this2 = this;
      this.target.addEventListener('keyup', function () {
        if ('readonly' === _this2.field.getAttribute('readonly')) {
          _this2.updateValue();
        }
      });
    }
  }, {
    key: "setTargetElement",
    value: function setTargetElement() {
      this.target = document.getElementById(this.targetValue);
      if (null === this.target) {
        throw "Wrong target specified for slug widget (\"".concat(this.field.dataset.target, "\").");
      }
    }

    /**
     * Append a "lock" button to control slug behaviour (auto or manual)
     */
  }, {
    key: "appendLockButton",
    value: function appendLockButton() {
      var _this3 = this;
      this.buttonTarget.addEventListener('click', function () {
        if (_this3.locked) {
          if (confirm(_this3.alertMessageValue)) {
            _this3.unlock();
          }
        } else {
          _this3.lock();
        }
      });
    }

    /**
     * Unlock the widget input (manual mode)
     */
  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
      this.buttonTarget.innerHTML = '&#128275;';
      this.field.removeAttribute('readonly');
    }

    /**
     * Lock the widget input (auto mode)
     */
  }, {
    key: "lock",
    value: function lock() {
      this.locked = true;
      this.buttonTarget.innerHTML = '&#128274;';

      // Locking it back changes the value either to default value, or recomputes it
      if ('' !== this.currentSlug) {
        this.field.value = this.currentSlug;
      } else {
        this.updateValue();
      }
      this.field.setAttribute('readonly', 'readonly');
    }
  }]);
  return _default;
}(_stimulus.Controller);
exports["default"] = _default;
_defineProperty(_default, "values", {
  target: String,
  alertMessage: String
});
_defineProperty(_default, "targets", ['button']);