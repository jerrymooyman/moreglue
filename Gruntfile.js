
module.exports = function(grunt){
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
        },
    }); 

    // load packages
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // setup tasks
    grunt.registerTask('default', ['jshint', 'karma']);
};
