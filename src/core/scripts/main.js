'use strict';

// Uncomment if you require ES6 Polyfills
// require("node_modules/babel-polyfill/dist/polyfill.min.js");

// import scrollmagic library
var ScrollMagic = require('scrollmagic');
// imort tweenmax from gsap
var TweenMax = require('gsap');
// require scrollmagic + gsap bindings
require('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');

define('main', function(require) {

  let $ = require('jquery');
  let log = require('browser/log')('main');

  class Main {

    constructor() {
      // initialize all components with data-component attributes
      this.init('component');
      // initialize all modules with data-module attributes
      this.init('module');
      // initialize scroll magic
      this.initScrollMagic();
    }


    init(attrType) {
      this[attrType] = [];
      let $elements = $(`[data-${attrType}]`);
      if($elements.length) {
        $elements.each( (idx, elem) => {
          let $el = $(elem);
          let name = $el.attr(`data-${attrType}`);
          let config = $el.attr('data-config');
          if( config && config.length > 0 ) {
            config = JSON.parse(config);
          }
          let Definition = require(name);
          log(`Main : Initializing ${attrType} : ${name}`);
          this[attrType].push(new Definition(elem, config));
        });
      }
    }

    // do all your animation within this function
    initScrollMagic() {
      console.log('init ');
      // init controller, you will only need one controller
      var controller = new ScrollMagic.Controller();



      // PANEL 1 ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      // var tween1 = TweenMax.fromTo('.header', 1, {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      // var scene = new ScrollMagic.Scene({
      //   triggerElement: ".panel-1-module",
      //   duration: 400,
      //   offset: 200
      // })

      // add your tween to your scene
      // .setTween(tween1)
      // add scene to your main controller
      // .addTo(controller)



      // PANEL 2 ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween2 = TweenMax.fromTo('.advertising', 1, {xPercent: 200, autoAlpha: 0}, {xPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-2-module',
        duration: 400,
        offset: 50
      })

      // add your tween to your scene
      .setTween(tween2)
      // add scene to your main controller
      .addTo(controller);



      // PANEL 3 ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween3 = TweenMax.fromTo('.rotate', 1, {xPercent: 600, rotation: 400}, {xPercent: 0, rotation: 0});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-3-module',
        duration: 300,
        offset: 0
      })

      // add your tween to your scene
      .setTween(tween3)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween4 = TweenMax.fromTo('.announce', 1, {xPercent: -300, autoAlpha: 0}, {xPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-3-module',
        duration: 600,
        offset: -200
      })

      // add your tween to your scene
      .setTween(tween4)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween5 = TweenMax.fromTo('.rotate', 1, {xPercent: 500, rotation: 100}, {xPercent: 0, rotation: 45});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-3-module',
        duration: 500,
        offset: -200
      })

      // add your tween to your scene
      .setTween(tween5)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween19 = TweenMax.fromTo('.download-btn', 1, {yPercent: 250, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-3-module',
        duration: 200,
        offset: 200
      })

      // add your tween to your scene
      .setTween(tween19)
      // add scene to your main controller
      .addTo(controller);



      // PANEL 4 TEXT ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween6 = TweenMax.fromTo('.help', 1, {yPercent: 150, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-4-module',
        duration: 500,
        offset: -200
      })

      // add your tween to your scene
      .setTween(tween6)
      // add scene to your main controller
      .addTo(controller);



      // PANEL 5 TEXT ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween7 = TweenMax.fromTo('.left', 2, {yPercent: -30, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1})

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-5-module',
        duration: 400,
        offset: -100
      })

      // add your tween to your scene
      .setTween(tween7)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween8 = TweenMax.fromTo('.center', 4, {yPercent: -30, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-5-module',
        duration: 400,
        offset: -50
      })

      // add your tween to your scene
      .setTween(tween8)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween9 = TweenMax.fromTo('.right', 6, {yPercent: -30, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-5-module',
        duration: 400,
        offset: -50
      })

      // add your tween to your scene
      .setTween(tween9)
      // add scene to your main controller
      .addTo(controller);



      // PANEL 6 ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween10 = TweenMax.fromTo('.started', 1, {xPercent: -200, autoAlpha: 0}, {xPercent: 0, autoAlpha: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-5-module',
        duration: 200,
        offset: 100
      })

      // add your tween to your scene
      .setTween(tween10)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween11 = TweenMax.fromTo('.download', 1, {xPercent: -200}, {xPercent: 0});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.panel-5-module',
        duration: 200,
        offset: 100
      })

      // add your tween to your scene
      .setTween(tween11)
      // add scene to your main controller
      .addTo(controller);



      // ICONS ----------

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween12 = TweenMax.fromTo('.hand', 1, {scale: 1}, {scale: .6});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-2',
        duration: 200,
        offset: -100
      })

      // add your tween to your scene
      .setTween(tween12)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween13 = TweenMax.fromTo('.hand', 1, {scale: .6}, {scale: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-2',
        duration: 100,
        offset: 250
      })

      // add your tween to your scene
      .setTween(tween13)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween14 = TweenMax.fromTo('.media', 1, {rotation: 0}, {rotation: 360});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-3',
        duration: 300,
        offset: 0
      })

      // add your tween to your scene
      .setTween(tween14)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween15 = TweenMax.fromTo('.small-head', 2, {xPercent: -20}, {xPercent: 0});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-2',
        duration: 300,
        offset: -250
      })

      // add your tween to your scene
      .setTween(tween15)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween16 = TweenMax.fromTo('.large-head', 2, {scale: 1.3}, {scale: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-2',
        duration: 300,
        offset: -250
      })

      // add your tween to your scene
      .setTween(tween16)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween17 = TweenMax.fromTo('.chart-back', 1, {yPercent: 20}, {yPercent: 0});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon',
        duration: 200,
        offset: -100
      })

      // add your tween to your scene
      .setTween(tween17)
      // add scene to your main controller
      .addTo(controller);

      // setup a GSAP Tween, look at TweenMax docs for syntax
      var tween18 = TweenMax.fromTo('.chart-focus', 1, {yPercent: -25, scale: 1.4}, {yPercent: 0, scale: 1});

      // scrollmagic scene, you will have one for each animation(tween), this will define things like the trigger element and
      // other scene parameters
      var scene = new ScrollMagic.Scene({
        triggerElement: '.icon',
        duration: 200,
        offset: -100
      })

      // add your tween to your scene
      .setTween(tween18)
      // add scene to your main controller
      .addTo(controller);

    }
  }

  // Singleton
  return new Main();

});