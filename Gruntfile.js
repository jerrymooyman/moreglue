
module.exports = function(grunt){
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            dev: {
                src: ['public/javascripts/*.js', 'app.js']
            }
        }
    }); 

    // load packages
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // setup tasks
    grunt.registerTask('default', ['jshint']);
};
