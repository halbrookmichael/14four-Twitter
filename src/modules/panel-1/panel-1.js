'use strict';

let $ = require('jquery');
let log = require('browser/log')('module:panel-1');

/**
 * first panel
 *
 * @module panel-1
 * @version 0.1.0
 * @author Michael Halbrook
 *
 * Generated on 2018-08-07 using @14four/generator-excalibur 0.1.23
 */

class Panel1 {

  constructor(element) {
    this.$el = $(element);
    log('Panel1 : Initialized');
  }

}

module.exports = Panel1;