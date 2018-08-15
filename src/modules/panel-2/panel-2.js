'use strict';

let $ = require('jquery');
let log = require('browser/log')('module:panel-2');

/**
 * second panel
 *
 * @module panel-2
 * @version 0.1.0
 * @author Michael Halbrook
 *
 * Generated on 2018-08-07 using @14four/generator-excalibur 0.1.23
 */

class Panel2 {

  constructor(element) {
    this.$el = $(element);
    log('Panel2 : Initialized');
  }

}

module.exports = Panel2;
