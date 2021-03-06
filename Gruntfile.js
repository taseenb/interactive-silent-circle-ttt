var pkg = require( './package.json' );
var currentTime = +new Date();
var assetPath = 'build/assets-' + currentTime;

module.exports = function ( grunt ) {

  var isDev = !(grunt.cli.tasks && grunt.cli.tasks[0] === 'deploy');

  grunt.initConfig( {
    connect: {
      server: {
        options: {
          port: pkg.config.port,
          hostname: '*',
          livereload: true,
          base: './',
          middleware: function ( connect, options, middlewares ) {
            // inject a custom middleware http://stackoverflow.com/a/24508523 
            middlewares.unshift( function ( req, res, next ) {
              res.setHeader( 'Access-Control-Allow-Origin', '*' );
              res.setHeader( 'Access-Control-Allow-Methods', '*' );
              return next();
            } );
            return middlewares;
          }
        }
      }
    },

    sass: {
      options: {
        //includePaths: ['bower_components/'],
        style: 'compressed', //(isDev) ? 'expanded' : 'compressed',
        sourcemap: 'inline' // (isDev) ? 'inline' : 'none'
      },
      build: {
        files: { 'build/assets/css/main.css': 'src/css/main.scss' }
      }
    },

    autoprefixer: {
      options: { map: true },
      css: { src: 'build/assets/css/*.css' }
    },

    clean: ['build/'],

    jshint: {
      options: {
        jshintrc: true,
        force: true
      },
      files: ['Gruntfile.js', 'src/*.js', 'src/js/*.js', 'src/js/app/**/*.js']
    },

    requirejs: {
      build: {
        options: {
          baseUrl: './src/js/app/',
          mainConfigFile: './src/js/libs/configPaths.js',
          optimize: 'uglify2', //(isDev) ? 'none' : 'uglify2',
          inlineText: true,
          name: '../libs/almond',
          out: 'build/assets/js/main.js',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          include: ['main'],
          wrap: {
            start: 'define(["require"],function(require){var req=(function(){',
            end: 'return require; }()); return req; });'
          }

        }
      }
    },

    watch: {

      data: {
        files: [
          'src/**/*.json'
        ],
        tasks: ['copy:data'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      scripts: {
        files: [
          'src/**/*.js',
          'src/boot.js',
          'src/js/app/templates/*.html'
        ],

        tasks: ['requirejs', 'replace'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      html: {
        files: ['src/*.html', 'src/**/*.html'],
        tasks: ['copy', 'replace'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      css: {
        files: ['src/css/**/*.*'],
        tasks: ['sass', 'autoprefixer', 'replace'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    copy: {

      data: {
        files: [
          { src: 'src/data/data.json', dest: 'build/assets/data/data.json' }
        ]
      },

      build: {
        files: [
          { src: 'src/index.html', dest: 'build/index.html' },
          { src: 'src/googlesheet-to-json.html', dest: 'build/googlesheet-to-json.html' },
          { src: 'src/js/libs/curl.js', dest: 'build/assets/js/curl.js' },
          { src: 'src/js/libs/require.js', dest: 'build/assets/js/require.js' },
          { src: 'src/boot.js', dest: 'build/boot.js' },
          { cwd: 'src/', src: 'imgs/**', dest: 'build/assets/', expand: true},
          { cwd: 'src/', src: 'fonts/**', dest: 'build/assets/', expand: true },
          { cwd: 'src/', src: 'import-data/**', dest: 'build/', expand: true }
        ]
      }
    },

    replace: {
      build: {
        options: {
          patterns: [
            {
              match: /{{local-root}}/g,
              replacement: ""
            },
            {
              match: /{{remote-root}}/g,
              replacement: "//labs.theguardian.com/2015/aug/silent-circle-interactive/"
            }
          ]
        },
        files: [
          {
            src: ['build/*.html', 'build/**/*.js', 'build/**/*.css'],
            dest: './'
          }
        ]
      }
    },

    rename: {
      main: {
        files: [
          { src: 'build/assets', dest: assetPath }
        ]
      }
    }

  } );

  // Task pluginsk
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
//  grunt.loadNpmTasks( 'grunt-aws' );
  grunt.loadNpmTasks( 'grunt-autoprefixer' );
  grunt.loadNpmTasks( 'grunt-replace' );
  grunt.loadNpmTasks( 'grunt-contrib-rename' );
  grunt.loadNpmTasks( 'grunt-curl' );


  // Tasks
//  grunt.registerTask('fetch', ['curl']);

  grunt.registerTask( 'build', [
//    'jshint',
    'clean',
    'sass',
    'autoprefixer',
    'requirejs',
    'copy',
    'replace'
  ] );

  grunt.registerTask( 'default', ['build', 'connect', 'watch'] );

};

