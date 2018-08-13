# Generated on 2018-08-13 using
# @14four/generator-excalibur 0.1.23

gulp         = require 'gulp'
lazypipe     = require 'lazypipe'
path         = require 'path'
del          = require 'del'
runSequence  = require 'run-sequence'
fs           = require 'fs'
util         = require 'util'

# auto load gulp plugins
plugins  = require('gulp-load-plugins')()

# parse command line arguments
argv     = require('minimist')( process.argv.slice 2 )

# gulp task configuration
config =
  isRelease: argv.release is true
  root: path.resolve __dirname
  srcRoot: path.resolve __dirname, 'src'
  output: if argv.release is true then path.join('build', 'release') else path.join('build', 'debug')
  php:
    root: path.resolve __dirname
    assets: path.resolve __dirname, 'public', 'assets'
    template:
      root: 'resources/views/frontend'
      modules: 'modules'
      pages: 'pages'
  sass:
    outputStyle: if argv.release is true then 'compressed' else 'expanded'
    includePaths: [
      path.resolve __dirname, './node_modules'
      path.resolve __dirname, './src/core/sass'
      path.resolve __dirname, './node_modules/@14four/armory-styles'
    ]
  autoprefixer:
    browsers: ['last 4 versions', 'Android 4']
  sourcemaps:
    includeContent: true


sassTask = lazypipe()
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.init()
  .pipe plugins.sass, config.sass
  .pipe plugins.autoprefixer, config.autoprefixer
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.write( config.sourcemaps )


coffeeTask = lazypipe()
  .pipe plugins.coffeelint
  .pipe plugins.coffeelint.reporter
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.init()
  .pipe plugins.coffee
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.write( config.sourcemaps )


jsTask = lazypipe()
  .pipe plugins.eslint
  .pipe plugins.eslint.format
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.init()
  .pipe plugins.babel
  .pipe ->
    return plugins.if !config.isRelease, plugins.sourcemaps.write( config.sourcemaps )


jsonTask = lazypipe()
  .pipe plugins.jshint,
    indent: 2
  .pipe plugins.jshint.reporter, 'jshint-stylish'


releaseJsTask = lazypipe()
  .pipe plugins.uglify


releaseCssTask = lazypipe()
  .pipe plugins.minifyCss,
    advanced: false
    aggressiveMerging: false


# The magic happens right here
Falcon      = require '@14four/falcon'
PageBuilder = require './falcon/page-builder'

Falcon.configure
  isRelease: config.isRelease
  root: config.root
  srcRoot: config.srcRoot
  buildRoot: config.output
  server:
    port: 4000
    # unique livereload port for project
    liveReloadPort: 35729 + 4000
    catchAll: 'index.html'
  assembler:
    root: config.output
    projectRoot: config.root
    dest: path.join config.output, 'assets', 'bundle', 'entry'
    jsTemplatePath: path.resolve __dirname, './falcon/templates/entry.js'
    # commonThreshold is the number of pages a dependency must be used on for it
    # to be included in the common bundle that's used on all pages in the
    # release build. This allows intelligent bundling of common dependencies
    # while allowing page-specific dependencies to be downloaded separately.
    # With the default setting of 2, dependencies that are used on more than one
    # page will be built into common in the release build.
    commonThreshold: 2
    commonName: 'common'
    releaseTasks:
      js: releaseJsTask
      css: releaseCssTask
  resolver:
    root: config.root
    extensions: ['.js', '.coffee', '.scss', '.sass', '.jpg', '.png', '.gif']
    paths: [
      path.resolve __dirname, './'
      path.resolve __dirname, './src/modules'
      path.resolve __dirname, './src/core/styles'
      path.resolve __dirname, './node_modules/@14four/armory-scripts/lib'
      path.resolve __dirname, './node_modules/@14four/armory-components/lib'
    ]
  notifier:
    projectName: 'Twitter'
  # triggers are files that don't generate direct output themselves but may
  # generate output by triggering processing on files that depend on them
  triggers: [
    '_*.scss'
    'src/modules/**/*.pug'
    'src/core/**/*.pug'
    'src/**/*.json'
  ]
  processors:

    asset:
      test: 'src/assets/**/*.*'
      src: 'src/assets/**/*.*'
      base: 'src/assets/'
      dest: path.join config.output, 'assets'
      isEntry: true

    sass:
      test: '*.scss'
      filter: ['**', '!**/_*.scss'] # filter out _*.scss files
      task: sassTask
      dest: path.join config.output, 'assets', 'bundle', 'css'
      preAnalyze: true
    
    coffee:
      test: '*.coffee'
      task: coffeeTask
      dest: path.join config.output, 'assets', 'bundle', 'js'
      postAnalyze: true
      amdify: true
    
    js_armory:
      test: 'node_modules/@14four/armory-scripts/lib/**/*.js'
      task: jsTask
      dest: path.join config.output, 'assets', 'bundle', 'js'
      postAnalyze: true
      amdify: true
      mapRoots: ['node_modules/@14four/armory-scripts/lib/']

    js_components_vendor:
      test: 'node_modules/@14four/armory-components/lib/**/+(node_modules|bower_components)/**/*.js'
      dest: path.join config.output, 'assets', 'bundle', 'js'
      amdify: true

    js_components:
      test: 'node_modules/@14four/armory-components/lib/*/*.js'
      task: jsTask
      dest: path.join config.output, 'assets', 'bundle', 'js'
      postAnalyze: true
      amdify: true
      mapRoots: ['node_modules/@14four/armory-components/lib/']

    js_vendor:
      test: '+(node_modules|bower_components)/**/*.js'
      dest: path.join config.output, 'assets', 'bundle', 'js'
      amdify: true
    
    polyfills:
      test: 'src/core/scripts/polyfills.js'
      src: 'src/core/scripts/polyfills.js'
      task: jsTask
      dest: path.join config.output, 'assets', 'bundle', 'js'
      postAnalyze: true
      amdify: true
      isEntry: true
    
    js:
      test: '*.js'
      task: jsTask
      dest: path.join config.output, 'assets', 'bundle', 'js'
      postAnalyze: true
      amdify: true

    json:
      test: '*.json'
      task: jsonTask
      # no output - just perform linting and output errors
      dest: false

    pages:
      test: 'src/pages/*.pug'
      src: 'src/pages/*.pug'
      dest: config.output
      isEntry: true
      builder: new PageBuilder(config.isRelease, config.srcRoot, ['core/scripts/main.js', 'core/styles/main.scss'])

gulp.task 'default', ['build']

gulp.task 'build', ->
  # clean must complete before the other tasks so it doesn't delete any
  # generated files
  runSequence 'clean', [
    'bundle'
  ]

gulp.task 'clean', (callback) ->
  del [ config.output + '**' ], callback

gulp.task 'icons', (cb) ->
  gulp.src path.join(config.srcRoot, 'icons', '*.svg')
    .pipe plugins.iconfont
      fontName: 'iconfont',
      appendCodepoints: true,
      normalize: true
    .on 'codepoints', (codepoints, options) ->
      # CSS templating here
      console.log codepoints, options
      if !config.isRelease
        console.log 'writing [pug]'
        pugData =
          codepoints: codepoints
          options: options
          isRelease: ->
            return false
          isDebug: ->
            return true
        gulp.src path.join(config.srcRoot, 'core', 'html', 'icons.pug')
          .pipe plugins.pug
            locals: pugData
          .pipe gulp.dest path.join(config.srcRoot, 'core', 'html', 'partials')
      gulp.src path.join(config.srcRoot, 'core', 'styles', '_icons-template.scss')
        .pipe plugins.consolidate 'lodash',
          glyphs: codepoints
          fontName: 'iconfont'
          fontPath: '/assets/fonts/'
          className: 's'
        .pipe plugins.rename('_icons.scss')
        .pipe gulp.dest path.join(config.srcRoot, 'core', 'styles')
    .pipe gulp.dest path.join(config.output, 'assets', 'fonts')

gulp.task 'bundle', ['icons'], ->
  Falcon.start()



# Clean, Mobe, and generate PHP Files
gulp.task 'move', ->
  runSequence 'cleanphp', [
    'moveassets',
    'modules',
    'pages'
  ]

# Move Assets to PHP
gulp.task 'cleanphp', (callback) ->
  del [
    path.join(config.php.assets + '**')
    path.join(config.php.template.root, config.php.template.modules)
    path.join(config.php.template.root, config.php.template.pages)
  ], callback

# Move assets from build directory into
gulp.task 'moveassets', ->
  gulp.src path.join(config.output, 'assets', '**')
    .pipe gulp.dest path.join( config.php.assets )


# Watch and generate PHP modules and pages
gulp.task 'watchphp', ->
  gulp.watch [path.join(config.srcRoot, 'modules', '**', '*.pug'), path.join(config.srcRoot, 'pages', '**', '*.pug')], ['modules', 'pages']


# Generate PHP module templates
gulp.task 'modules', ->
  folders = fs.readdirSync( path.join(config.srcRoot, 'modules'));
  folders.forEach( (folder) ->
    folderPath = path.join(config.srcRoot, 'modules', folder)
    dataFiles = fs.readdirSync( path.join(folderPath, 'data') )

    dataFiles.forEach( (dataFile) ->
      gulp.src [path.join(folderPath, '*.pug')]
        .pipe plugins.plumber()
        .pipe plugins.data( () ->
          data: JSON.parse( fs.readFileSync( path.join(folderPath, 'data', dataFile) ) ),
          isPhp: true,
          isRealease: () ->
            return config.isRealease
        )
        .pipe plugins.pug(
          pretty: !config.isRealease,
          basedir: config.srcRoot
        )
        
        .pipe plugins.rename( (path) ->
          if dataFile != 'default.json'
            path.basename += '_' + dataFile.replace('.json', '')
        )
        .pipe gulp.dest path.join(config.php.root, config.php.template.root, 'modules', folder )
    )
  )


# Generate PHP page templates
gulp.task 'pages', ->
  gulp.src [path.join(config.srcRoot, 'pages', '**', '*.pug')]
    .pipe plugins.data((file) ->
      page: path.basename(file.path, '.pug')
      isPhp: true
      isRelease: () ->
        return config.isRelease
      export: () ->
        true
    )
    .pipe plugins.pug(
      pretty: !config.isRelease
      basedir: config.srcRoot
    )
    

    .pipe gulp.dest path.join(config.php.root, config.php.template.root, config.php.template.pages)
