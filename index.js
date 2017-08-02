import {regExpEscape} from './lib/util';

export default class I18n {

  constructor(locale, i18nData) {
    this._locale = locale || 'zh';
    this._i18nData = i18nData || {};
  }

  // set locale data of one locale
  setLocaleData(locale, data={}) {
    this._i18nData[locale] = data;
  }

  // get locale data
  getLocaleData(lc) {
    let locale = lc || this.getLocale();
    return this._i18nData[locale] || {};
  }

  // set the current locale
  setLocale(locale) {
    this._locale = locale;
  }

  // get the current locale
  getLocale() {
    return this._locale;
  }

  // translate keys
  translate(key, vars={}) {
    let locale = this._locale;
    let data = this._i18nData[locale] || {};
    let val = data[key];
    let arr = key.split('.', 2);

    if (!val && arr.length > 1) {
      val = this.findDotTranslate(arr[1], data[arr[0]]);
    }

    if (!val) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Translate lost: [${locale}] => [${key}]`);
      }
      return val;
    }

    return this.formatString(val, vars);
  }

  __(...args) {
    return this.translate(...args);
  }

  findDotTranslate(key, data) {
    if (typeof data !== 'object') return null;

    let val = data[key];
    let arr = key.split('.', 2);

    if (val) return val;

    if (arr.length > 1) {
      val = this.findDotTranslate(arr[1], data[arr[0]]);
    }

    return val;
  }

  // format string
  formatString(string, vars={}) {
    Object.keys(vars).forEach((key) => {
      let re = new RegExp('\\$\\{' + regExpEscape(key) + '\\}', 'g');
      string = string.replace(re, vars[key]);
    });
    return string;
  }
}
