
module.exports = function(grunt){
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
            myServer: {
                port: 3000,
                server: ['app.js'],
                bases: ['public'],
                livereload: true,
                serverreload: true
            }
        },

        jshint: {
            dev: {
                src: ['public/javascripts/*.js', 'app.js']
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
            }
        },

        jasmine: {
            all: {
                src: ['test/spec/**/*.js'],
                errorReporting: true
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ['**/*.html'],
            },
            css: {
                files: ['**/*.css'],
            }
        },
    }); 

    // load packages
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //grunt.loadNpmTasks('grunt-express');

    // setup tasks
    grunt.registerTask('default', ['jshint', 'jasmine']);
};
