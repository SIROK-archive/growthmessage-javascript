module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['./ts/*.ts'],
                dest: './growthmessage.js',
                options: {
                    sourceMap: true,
                    declaration: false,
                },
            },
        },
        uglify: {
            dist: {
                options: {
                    sourceMapIn: './growthmessage.js.map',
                    sourceMap: './growthmessage.min.js.map',
                    sourceMapRoot: './ts/'
                },
                files: {
                    './growthmessage.min.js': ['./growthmessage.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['./ts/*.ts'],
                tasks: ['typescript', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['typescript', 'uglify']);

};
