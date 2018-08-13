_              = require 'lodash'
fs             = require 'fs'
path           = require 'path'
extend         = require 'extend'
lazypipe       = require 'lazypipe'
gulpdata       = require 'gulp-data'
pug            = require 'gulp-pug'
compiler       = require 'pug'
log            = require '@14four/falcon/lib/logger'
Builder        = require '@14four/falcon/lib/builder'

class PageBuilder extends Builder

  constructor: (isRelease, root, forcedDependencies) ->
    builder = @
    @currentFile = null
    @isRelease = isRelease
    @root = root
    # forced dependencies shared across all pages
    if forcedDependencies?
      forced = forcedDependencies.map (d) ->
        return path.resolve(builder.root, d)
    else
      forced = []
    @config =
      pretty: !isRelease
      compileDebug: !isRelease
      # allow absolute path includes in pug files relative to the provided root
      basedir: @root
      locals:
        json: (dataPath) =>
          return @data dataPath
        pugPartial: (pugPath, pugData, pugConfig) =>
          return @pugPartial pugPath, pugData, pugConfig
        isDebug: =>
          return !@isRelease
        isRelease: =>
          return @isRelease
        env: =>
          return if @isRelease then 'release' else 'debug'
        export: ->
          pageDependencies = this.dependencies[this.page]
          if pageDependencies?
            dataPaths = pageDependencies.data.map (p) ->
              return path.resolve(builder.root, p)
            pageForcedPaths = pageDependencies.forced.map (p) ->
              return path.resolve(builder.root, p)
            deps = _.union forced, pageDependencies.modules, pageDependencies.components, dataPaths, pageForcedPaths
            log.yellow 'Page Builder : Page Dependencies', this.page, '\n', deps
            builder.emit 'dependencies', builder.currentFile, deps
          else
            # no page-specific dependencies so emit the forced dependencies
            builder.emit 'dependencies', builder.currentFile, forced

    @task = lazypipe()
      # tap into the stream to track the path of the current page being processed
      # and provide it as locals to pug via gulp-data
      .pipe gulpdata, (file) =>
        @currentFile = file.path
        filename = path.basename file.path, '.pug'
        @config.locals.page = filename
        return @config.locals
      .pipe pug, @config
    return

  # Returns the Pug config
  #
  getConfig: ->
    return @config

  # Returns a lazypipe gulp task for building pages.
  #
  getTask: ->
    return @task

  # Utility function to compile a pug partial with data.
  #
  pugPartial: (pugPath, pugData, pugConfig) ->
    # console.log 'PageBuilder : Pug Partial', pugPath, path.resolve( @root, pugPath )
    pugSource = fs.readFileSync( path.resolve( @root, pugPath ) )
    pugData = @data pugData
    if pugConfig?
      pugData.data.config = JSON.stringify(pugConfig)
    if pugPath.match /.pug/g
      options = extend @config, { filename: pugPath }
      return compiler.compile( pugSource, options )( pugData )
    else
      return pugSource

  # Utility function to return JSON data from a file.
  #
  data: (a) ->
    if typeof a is 'string'
      return JSON.parse fs.readFileSync( path.resolve( @root, a ) )
    return a

# Singleton
module.exports = PageBuilder
