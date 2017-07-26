var assert = require('assert');
var I18n = require('../dist/i18n-s');
var i18nData = require('./locale/zh-cn.json');

var locale = 'zh-cn';
var i18n = new I18n();

i18n.setLocaleData(locale, i18nData);
i18n.setLocale(locale);

describe('simple', function() {
  it('pass', function() {
    assert.equal('test string', i18n.__('test'));
  });
});

describe('with dot', function() {
  it('pass', function() {
    assert.equal('test string b', i18n.__('b.test'));
  });
});

describe('with vars', function() {
  it('pass', function() {
    assert.equal('Json is Joy\'s father', i18n.__('a is b\'s father', {
      a: 'Json',
      b: 'Joy'
    }));
  });
});

describe('with context', function() {
  it('pass', function() {
    assert.equal('test string c', i18n.__('c.test'));
  });
});
