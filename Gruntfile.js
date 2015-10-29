// Generated on 2015-03-05 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  //require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  /*grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('')*/

  // Configurable paths
  var config = {
    app: 'webrd',
    dist: 'dist',
    bower: 'webrd/bower_components'
  };

  /*_____________________________________CONFIG______________________________________*/

  grunt.initConfig({

    // Project settings
    config: config,

    // Empties folders to start fresh
    clean: ['<%= config.dist %>/*','.tmp'],

    // Config for transforming blocks in index.html via usemin below
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: 'index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    //Concatenate files
    concat: {
      generated: {
        files: [
          {
            dest: '.tmp/concat/js/libs.js',
            src: [
              '<%= config.app %>/assets/libs/{,*/}*.js'
            ]
          }
        ]
      }
    },

    //Uglify
    uglify: {
      options:{
        beautify:false,
        mangle:true,
        compress: {
          drop_console: true
        }
      },
      generated: {
        files: [
          {
            dest: 'dist/js/',
            src: [ '!.tmp/concat/js/a.js' ]
          }
        ]
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* _ */'
        },
        files: [
          {
            '<%= config.dist %>/assets/css/style.css': ['assets/css/style.css']
          },
          {
            
          }
        ]
      }
    },

    //Copy to DIST
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            //'images/{,*/}*.webp',
            '{,*/}*.html'
            //'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: '.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          cwd: 'app',
          src: ['**/*', '!*.js', '!**/json/**','!**/**/**.js','!**/**/**.css'],
          dest: '<%= config.dist %>/app'
        },
        {
          expand: true,
          cwd: 'assets',
          src: ['**/*','!**/libs/**','!**/js/**'],
          dest: '<%= config.dist %>/assets'
        }/*,
        {
          expand: true,
          cwd: 'app',
          src: 'app.routes.js',
          dest: '<%= config.dist %>/app/'          
        }*/
      ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/js/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}',
            '!<%= config.dist %>/js/app.routes.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.dist %>',
            src: '{,*/}*.html',
            dest: '<%= config.dist %>'
          },
          {
            expand: true,
            cwd: '<%= config.dist %>/app/components/',
            src: '**/**/*.html',
            dest: '<%= config.dist %>/app/components/'          
          }
        ]
      }
    },

    protractor: {
      options: {
        // Location of your protractor config file
        configFile: "test/protractor-conf.js",
     
        // Do you want the output to use fun colors?
        noColor: false,
     
        // Set to true if you would like to use the Protractor command line debugging tool
        // debug: true,
        keepAlive: true,
        // Additional arguments that are passed to the webdriver command
        args: { }
      },
      e2e: {
        options: {
          // Stops Grunt process if a test fails
          //keepAlive: false
        }
      },
      continuous: {
        options: {
          //keepAlive: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      test: {
        options: {
          // set the location of the application files
          base: ['']
        }
      }
    },

    protractor_webdriver: {
      options: {
        // Task-specific options go here. 
        command: 'webdriver-manager start'
      },
      your_target: {
        // Target-specific file lists and/or options go here. 
      },
    }
  
  });

  /*__________________________________COMMANDS TO DO THINGS____________________________*/

  grunt.registerTask('e2etest',[
    'connect:test',
    'protractor:e2e'
  ]);

  grunt.registerTask('production', [
    'clean',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'copy:dist',//copy rest of files over
    'cssmin',
    'rev',//rename files for caching purposes
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('serve',[
    'connect:test'
  ])

};
