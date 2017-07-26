(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['i18n-s'] = factory());
}(this, (function () { 'use strict';

function regExpEscape(s) {
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var I18n = function () {
  function I18n(locale, i18nData) {
    _classCallCheck(this, I18n);

    this._locale = locale || 'zh';
    this._i18nData = i18nData || {};
  }

  // set locale data of one locale


  _createClass(I18n, [{
    key: 'setLocaleData',
    value: function setLocaleData(locale) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._i18nData[locale] = data;
    }

    // set the current locale

  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
    }

    // translate keys

  }, {
    key: 'translate',
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
        if (process.env.NODE_ENV !== 'production') {
          console.log('Translate lost: [' + locale + '] => [' + key + ']');
        }
        return val;
      }

      return this.formatString(val, vars);
    }
  }, {
    key: '__',
    value: function __() {
      return this.translate.apply(this, arguments);
    }
  }, {
    key: 'findDotTranslate',
    value: function findDotTranslate(key, data) {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return null;

      var val = data[key];
      var arr = key.split('.', 2);

      if (val) return val;

      if (arr.length > 1) {
        val = this.findDotTranslate(arr[1], data[arr[0]]);
      }

      return val;
    }

    // format string

  }, {
    key: 'formatString',
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

return I18n;

})));
//# sourceMappingURL=i18n-s.js.map
