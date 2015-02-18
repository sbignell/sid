var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'node_modules/bootstrap/',
            src: ['js/**', 'less/**'], dest: 'client/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'node_modules/backbone/',
            src: ['backbone.js'], dest: 'client/vendor/backbone/'
          },
          {
            expand: true, cwd: 'node_modules/font-awesome/',
            src: ['fonts/**', 'less/**'], dest: 'client/vendor/font-awesome/'
          },
          {
            expand: true, cwd: 'node_modules/html5shiv/dist/',
            src: ['html5shiv.js'], dest: 'client/vendor/html5shiv/'
          },
          {
            expand: true, cwd: 'node_modules/jquery/dist/',
            src: ['jquery.js'], dest: 'client/vendor/jquery/'
          },
          {
            expand: true, cwd: 'node_modules/jquery.cookie/',
            src: ['jquery.cookie.js'], dest: 'client/vendor/jquery.cookie/'
          },
          {
            expand: true, cwd: 'node_modules/moment/',
            src: ['moment.js'], dest: 'client/vendor/momentjs/'
          },
          {
            expand: true, cwd: 'node_modules/respond.js/src/',
            src: ['respond.js'], dest: 'client/vendor/respond/'
          },
          {
            expand: true, cwd: 'node_modules/underscore/',
            src: ['underscore.js'], dest: 'client/vendor/underscore/'
          }
        ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: [
            'node_modules/**',
            'client/**'
          ],
          ext: 'js'
        }
      }
    },
    watch: {
      clientJS: {
         files: [
          'client/layouts/**/*.js', '!client/layouts/**/*.min.js',
          'client/views/**/*.js', '!client/views/**/*.min.js'
         ],
         tasks: ['newer:uglify', 'newer:jshint:client']
      },
      serverJS: {
         files: ['api/**/*.js'],
         tasks: ['newer:jshint:server']
      },
      clientLess: {
         files: [
          'client/layouts/**/*.less',
          'client/views/**/*.less',
          'client/less/**/*.less'
         ],
         tasks: ['newer:less']
      },
      layoutLess: {
        files: [
          'client/layouts/**/*.less',
          'client/less/**/*.less'
        ],
        tasks: ['less:layouts']
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(filePath) {
          return filePath + '.map';
        }
      },
      layouts: {
        files: {
          'client/layouts/core.min.js': [
            'client/vendor/jquery/jquery.js',
            'client/vendor/jquery.cookie/jquery.cookie.js',
            'client/vendor/underscore/underscore.js',
            'client/vendor/backbone/backbone.js',
            'client/vendor/bootstrap/js/affix.js',
            'client/vendor/bootstrap/js/alert.js',
            'client/vendor/bootstrap/js/button.js',
            'client/vendor/bootstrap/js/carousel.js',
            'client/vendor/bootstrap/js/collapse.js',
            'client/vendor/bootstrap/js/dropdown.js',
            'client/vendor/bootstrap/js/modal.js',
            'client/vendor/bootstrap/js/tooltip.js',
            'client/vendor/bootstrap/js/popover.js',
            'client/vendor/bootstrap/js/scrollspy.js',
            'client/vendor/bootstrap/js/tab.js',
            'client/vendor/bootstrap/js/transition.js',
            'client/vendor/momentjs/moment.js',
            'client/layouts/core.js'
          ],
          'client/layouts/ie-sucks.min.js': [
            'client/vendor/html5shiv/html5shiv.js',
            'client/vendor/respond/respond.js',
            'client/layouts/ie-sucks.js'
          ],
          'client/layouts/admin.min.js': ['client/layouts/admin.js']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'client/views/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'client/views/',
          ext: '.min.js'
        }]
      }
    },
    jshint: {
      client: {
        options: {
          jshintrc: '.jshintrc-client',
          ignores: [
            'client/layouts/**/*.min.js',
            'client/views/**/*.min.js'
          ]
        },
        src: [
          'client/layouts/**/*.js',
          'client/views/**/*.js'
        ]
      },
      server: {
        options: {
          jshintrc: '.jshintrc-server'
        },
        src: [
          'nosql-schema/**/*.js',
          'api/**/*.js'
        ]
      }
    },
    less: {
      options: {
        compress: true
      },
      layouts: {
        files: {
          'client/layouts/core.min.css': [
            'client/less/bootstrap-build.less',
            'client/less/font-awesome-build.less',
            'client/layouts/core.less'
          ],
          'client/layouts/admin.min.css': ['client/layouts/admin.less']
        }
      },
      views: {
        files: [{
          expand: true,
          cwd: 'client/views/',
          src: ['**/*.less'],
          dest: 'client/views/',
          ext: '.min.css'
        }]
      }
    },
    clean: {
      js: {
        src: [
          'client/layouts/**/*.min.js',
          'client/layouts/**/*.min.js.map',
          'client/views/**/*.min.js',
          'client/views/**/*.min.js.map'
        ]
      },
      css: {
        src: [
          'client/layouts/**/*.min.css',
          'client/views/**/*.min.css'
        ]
      },
      vendor: {
        src: ['client/vendor/**']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['copy:vendor', 'newer:uglify', 'newer:less', 'concurrent']);
  grunt.registerTask('build', ['copy:vendor', 'uglify', 'less']);
  grunt.registerTask('lint', ['jshint']);
};
