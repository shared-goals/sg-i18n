# i18n-s

> A simple tool to translate i18n.

## use

install

```sh
npm install i18n-s -S
```

use

```js
import I18n from 'i18n-s';

let locale = 'zh-cn';
let localeData = {
  "test": "test string",
  "b.test": "test string b",
  "a is b's father": "${a} is ${b}'s father",

  "c": {
    "test": "test string c"
  }
}

let i18n = new I18n({
  locale: 'zh-CN', // init locale
  i18nData: {}, // init data,
  log: process.env.NODE_ENV !== 'production', // is log when no translate
  // log: function(msg) { console.log(msg) }, // log can be a function
});

// set current locale and locale data
i18n.setLocaleData(locale, i18nData);
i18n.setLocale(locale);

// translate with vars
let str = i18n.__('test');

// translate with dot
let str = i18n.__('b.test');

// translate with context
let str = i18n.__('c.test');

// translate with vars
let str = i18n.__('a is b\'s father', {
  a: 'Json',
  b: 'Joy'
});

```

## api

- `i18n.setLocaleData(locale, localeData)`
- `i18n.setLocale(locale)`
- `i18n.translate(key, vars={})`
- `i18n.__(key, vars={})`: alias to `i18n.translate`
