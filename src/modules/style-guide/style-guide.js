'use strict';

let $ = require('jquery');
let log = require('browser/log')('module');

/**
 * Project Style Guide
 *
 * @module style-guide
 * @version 0.1.0
 * @author 14Four
 *
 * Generated on 2018-08-07 using @14four/generator-excalibur 0.1.23
 */

class StyleGuide {

  constructor(element) {
    this.$el = $(element);
    log('StyleGuide : Initialized');
  }

}

module.exports = StyleGuide;
