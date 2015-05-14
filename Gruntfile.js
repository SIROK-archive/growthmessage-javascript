module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['./source/ts/*.ts'],
                dest: './growthmessage.js',
                options: {
                    sourceMap: false,
                    declaration: false,
                },
            },
        },
        tjs2GM: {
            src: './bower_components/t.js/t.min.js',
            dest: './growthmessage.js',
        },
        text2GM: {
            src: [
                './source/html/dialog-image.html',
                './source/html/dialog-text.html',
            ],
            dest: './growthmessage.js',
        },
        uglify: {
            dist: {
                files: {
                    './growthmessage.min.js': ['./growthmessage.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['./ts/*.ts'],
                tasks: ['typescript', 'tjs2GM', 'text2GM', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('./tasks');

    grunt.registerTask('default', ['typescript', 'tjs2GM', 'text2GM', 'uglify']);

};
