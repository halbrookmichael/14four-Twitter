'use strict';

let $ = require('jquery');
let log = require('browser/log')('module:panel-6');

/**
 * sixth panel
 *
 * @module panel-6
 * @version 0.1.0
 * @author Michael Halbrook
 *
 * Generated on 2018-08-07 using @14four/generator-excalibur 0.1.23
 */

class Panel6 {

  constructor(element) {
    this.$el = $(element);
    log('Panel6 : Initialized');
  }

}

module.exports = Panel6;
