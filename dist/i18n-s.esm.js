function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function regExpEscape(s) {
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

var I18n =
/*#__PURE__*/
function () {
  function I18n() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, I18n);

    var _opts$locale = opts.locale,
        locale = _opts$locale === void 0 ? 'zh-CN' : _opts$locale,
        _opts$i18nData = opts.i18nData,
        i18nData = _opts$i18nData === void 0 ? {} : _opts$i18nData,
        _opts$log = opts.log,
        log = _opts$log === void 0 ? process.env.NODE_ENV !== 'production' : _opts$log; // data

    this._locale = locale;
    this._i18nData = i18nData;
    this._log = log;
  } // log


  _createClass(I18n, [{
    key: "log",
    value: function log(msg) {
      // no log
      if (!this._log) return; // log msg

      if (typeof this._log === 'function') {
        this._log(msg);
      } else if (console && console.log) {
        console.log(msg);
      }
    } // set locale data of one locale

  }, {
    key: "setLocaleData",
    value: function setLocaleData(locale) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this._i18nData[locale] = data;
    } // get locale data

  }, {
    key: "getLocaleData",
    value: function getLocaleData(lc) {
      var locale = lc || this.getLocale();
      return this._i18nData[locale] || {};
    } // set the current locale

  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      this._locale = locale;
    } // get the current locale

  }, {
    key: "getLocale",
    value: function getLocale() {
      return this._locale;
    } // translate keys

  }, {
    key: "translate",
    value: function translate(key) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var locale = this._locale;
      var data = this._i18nData[locale] || {};
      var val = data[key];
      var arr = key.split('.', 2);

      if (!val && arr.length > 1) {
        val = this.findDotTranslate(arr[1], data[arr[0]]);
      }

      if (!val) {
        this.log("Translate lost: [".concat(locale, "] => [").concat(key, "]"));
        return val;
      }

      return this.formatString(val, vars);
    }
  }, {
    key: "__",
    value: function __() {
      return this.translate.apply(this, arguments);
    }
  }, {
    key: "findDotTranslate",
    value: function findDotTranslate(key, data) {
      if (_typeof(data) !== 'object') return null;
      var val = data[key];
      var arr = key.split('.', 2);
      if (val) return val;

      if (arr.length > 1) {
        val = this.findDotTranslate(arr[1], data[arr[0]]);
      }

      return val;
    } // format string

  }, {
    key: "formatString",
    value: function formatString(string) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.keys(vars).forEach(function (key) {
        var re = new RegExp('\\$\\{' + regExpEscape(key) + '\\}', 'g');
        string = string.replace(re, vars[key]);
      });
      return string;
    }
  }]);

  return I18n;
}();

export default I18n;
//# sourceMappingURL=i18n-s.esm.js.map
