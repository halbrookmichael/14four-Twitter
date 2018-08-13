# Twitter

14four

## Technology

* [Falcon](https://bitbucket.org/14fourdev/14four-falcon) - Configurable gulp-based build system with automatic dependency detection and bundling
* [Gulp](http://gulpjs.com/) - Streaming build system
* [Bower](http://bower.io/) - Front-end package management
* [npm](https://www.npmjs.com/) - Node package manager
* [Jade](http://jade-lang.com/) - Node templating engine
* [Sass](http://sass-lang.com/) - Syntactically Awesome Style Sheets
* [Yeoman](http://yeoman.io/) - Scaffolding
* [Babel](https://babeljs.io/) - JavaScript compiler to use ES6+ code today
* [CoffeeScript](http://coffeescript.org/) - A little language that compiles into JavaScript

## Methodology

### Modules

Modules are self-contained units of markup, styling, logic, and data. They should be developed in a generic and reusable manner when possible, although extremely specific non-reusable modules may be necessary in some cases. Examples of modules include navigation, footer, video overlay, etc. All modules are found within the `src/modules` folder. Each has its own folder and `package.json` file to allow module scripts, styles, and dependencies to be included based on use.

### Pages

Pages are built using modules. As much as possible, pages should be assembled using nothing but modules. All pages are found in the `src/pages` folder.

### JavaScript

JavaScript may be written using either the [CommonJS](http://www.commonjs.org/) or [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD) module approach. CommonJS modules are preferred. Each module should explicitly `require` any dependencies it uses rather than relying on global variables.

### CSS

All styles should be written using a minimal amount of nesting. With that in mind, each module should define a single outer class to isolate all internal module-specific styling to just that module. Reasonable global styles should be added in `src/core/styles` to minimize the amount of module-specific styling. For example, a core set of `h1` to `h6` and `p` styles should be added globally and then the appropriate ones should be used within modules and should only be adjusted as modules differ from the most commonly used global styles.

### Styleguide

There is a bare bones styleguide included by default.  This is very rough and can/should be manually edited at the start of a project as a resource for displaying the global styles used in the project. Your icon fonts generated via the build system will be included in this style guide.

### Icon Fonts

Any icons used in the project can be included in the `src/icons` folder as SVG files.  Any time you add an icon to this folder you must run the `gulp icons` task (icons are also built as part of the default build). This task will build a sass file with the styles needed for using your icon font. It will also build `core/html/partials/icons.html` which will be included in the styleguide. If you need to rename your iconfont this can be done in gulpfile.coffee. If you want to change your generated SASS you can edit `src/core/styles/_icons-template.scss`.

## Project Structure

### Source

The `src/core` folder contains the following subfolders and files of interest:

* `html` - contains the core page markup, HTML partials, and a collection of Jade mixins
* `scripts` - contains the core script files
* `scripts/main.js` - contains the main JavaScript logic that initializes all modules. This is what kicks off JavaScript execution.
* `styles` - contains the core site styles with a CSS reset, a place for variables, mixins, site-wide typography styling, etc.

The `src/icons` folder contains the SVG icons that will be used in building an icon webfont.

### Bower Packages

Bower packages are installed into the `bower_components` folder. By default, packages are included based on your selections while running the scaffolder. Feel free to modify them for your project.

Packages can added to `bower.json` and installed using `bower install --save [package-name]`. See the [Bower website](http://bower.io/) for more details. To use these packages, simply `require` them where needed and they will be automatically included in the build. Bower `require` calls should use the path to the desired file. For example: `require('bower_components/enquire/dist/enquire.js')`. You can require the unminified source files for easier debugging during development and they will be minified during the release build.

### npm Packages

npm packages are installed into the `node_modules` folder. If a frontend package is available via npm, the npm package is preferred over the Bower package as the `package.json` file in the npm package contains info to make it easier to include the package into the build. For example, installing `jquery` as an npm package allows you to simply `require('jquery')` using the package name in your code rather than using the equivalent Bower `require('bower_components/jquery/jquery.js')`.

# Getting Started

## Setup

All commands are run from the project root folder. By default, `npm install` and `bower install` are run automatically when scaffolding the project and should be run again anytime the `package.json` or `bower.json` files are modified, particularly when someone else adds a dependency to them.

Install all the node package dependencies listed in the `package.json` file:

    $ npm install

Install all the necessary global node packages:

    $ npm install -g bower
    $ npm install -g gulp
    $ npm install -g yo

Download all the necessary bower packages:

    $ bower install

## Build System

### What you get

* `debug` build of the site with full unminified code and complete sourcemaps
* `release` build of the site with minified and concatenated CSS and JavaScript files
* A server that launches the site and watches all sources files for changes and intelligently rebuilds only the necessary files and live reloads them for near instant feedback in the browser

### Configuration

The Gulp tasks are defined in `gulpfile.coffee`. Any new Gulp functionality can be added using this file.

### Let's do this

The site is built into `debug` and `release` folders inside the `build` folder.

To build `debug` and launch the server with live reload support, simply run the default `gulp` task:

    $ gulp

This will launch the server on port `4000` and run other build tasks as appropriate to keep the build in sync with the source files. You can also manually run tasks including:

* `gulp build` - perform a complete build. This is the same as just `gulp`.
* `gulp clean` - remove the contents of the `debug` or `release` folder
* `gulp icons` - create an icon font from the svg files in the `src\icons` directory

Any `gulp` task can be run for the `release` build by adding `--release` to the command. So to do a complete `release` build run:

    $ gulp --release

## Move

### What it does

This gulp task will copy the built `assets` folder from the `debug` or `release` directory into the `php/public/assets` directory.

It's **required** that you run the respected build `gulp` or `gulp --release` before you can move the files.

### Configuration

The Gulp tasks are defined in `gulpfile.coffee`.

The default php directory is `php` however this can be modified by changing `config.phpRoot` at ~ line 21.

### Let's move this

To move the debug assets to php.

    $ gulp move

To move the release build assets to php.

    $ gulp move --release

#### Notes

Please not that all files in `config.phpRoot + 'public/assets'` will be removed before being replaced. This is to keep that folder clean. However if you manually add files there you will end up overwriting them.
