'use strict';

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
  function _default() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _this.locked = true;
    _this.field = void 0;
    _this.targetElements = void 0;
    _this.currentSlug = void 0;
    return _this;
  }
  _inheritsLoose(_default, _Controller);
  var _proto = _default.prototype;
  _proto.connect = function connect() {
    this.field = this.element.querySelector('input');
    this.field.setAttribute('readonly', 'readonly');
    this.setTargetElements();
    if ('' === this.field.value) {
      this.currentSlug = '';
      this.updateValue();
      this.listenTarget();
    } else {
      this.currentSlug = this.field.value;
    }
    this.appendLockButton();
  }

  /**
   * Slugify each target value, and join the non-empty ones using a dash
   */;
  _proto.updateValue = function updateValue() {
    this.field.value = this.targetElements.map(function (target) {
      return slugify(target.value, {
        remove: /[^A-Za-z0-9\s-]/g,
        lower: true,
        strict: true
      });
    }).filter(function (value) {
      return '' !== value;
    }).join('-');
  };
  _proto.listenTarget = function listenTarget() {
    var _this2 = this;
    this.targetElements.forEach(function (target) {
      target.addEventListener('input', function () {
        if ('readonly' === _this2.field.getAttribute('readonly')) {
          _this2.updateValue();
        }
      });
    });
  };
  _proto.setTargetElements = function setTargetElements() {
    this.targetElements = this.targetsValue.map(function (targetId) {
      var target = document.getElementById(targetId);
      if (null === target) {
        throw "Wrong target specified for slug widget (\"" + targetId + "\").";
      }
      return target;
    });
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
  targets: Array,
  alertMessage: String,
  lockedIcon: String,
  unlockedIcon: String
};
_default.targets = ['button'];
export { _default as default };