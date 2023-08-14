'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
import { Controller } from '@hotwired/stimulus';
import slugify from 'slugify';
slugify.extend({
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
  _inheritsLoose(_default, _Controller);
  var _super = _createSuper(_default);
  function _default() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.locked = true;
    _this.field = void 0;
    _this.target = void 0;
    _this.currentSlug = void 0;
    return _this;
  }
  var _proto = _default.prototype;
  _proto.connect = function connect() {
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
  };
  _proto.updateValue = function updateValue() {
    this.field.value = slugify(this.target.value, {
      remove: /[^A-Za-z0-9\s-]/g,
      lower: true,
      strict: true
    });
  };
  _proto.listenTarget = function listenTarget() {
    var _this2 = this;
    this.target.addEventListener('keyup', function () {
      if ('readonly' === _this2.field.getAttribute('readonly')) {
        _this2.updateValue();
      }
    });
  };
  _proto.setTargetElement = function setTargetElement() {
    this.target = document.getElementById(this.targetValue);
    if (null === this.target) {
      throw "Wrong target specified for slug widget (\"" + this.field.dataset.target + "\").";
    }
  }

  /**
   * Append a "lock" button to control slug behaviour (auto or manual)
   */;
  _proto.appendLockButton = function appendLockButton() {
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
   */;
  _proto.unlock = function unlock() {
    this.locked = false;
    this.buttonTarget.innerHTML = this.unlockedIconValue;
    this.field.removeAttribute('readonly');
  }

  /**
   * Lock the widget input (auto mode)
   */;
  _proto.lock = function lock() {
    this.locked = true;
    this.buttonTarget.innerHTML = this.lockedIconValue;

    // Locking it back changes the value either to default value, or recomputes it
    if ('' !== this.currentSlug) {
      this.field.value = this.currentSlug;
    } else {
      this.updateValue();
    }
    this.field.setAttribute('readonly', 'readonly');
  };
  return _default;
}(Controller);
_default.values = {
  target: String,
  alertMessage: String,
  lockedIcon: String,
  unlockedIcon: String
};
_default.targets = ['button'];
export { _default as default };