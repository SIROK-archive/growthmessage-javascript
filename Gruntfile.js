module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    update: true,
                },
                files: [{
                    expand: true,
                    cwd: './source/scss',
                    src: ['*.scss'],
                    dest: './source/css',
                    ext: '.css',
                }],
            },
        },
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
        nanoajax2GM: {
            src: './bower_components/nanoajax/index.js',
            dest: './growthmessage.js',
        },
        text2GM: {
            src: [
                './source/css/styles.css',
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
                files: [
                    './source/ts/*.ts',
                    './source/html/*.html',
                    './source/scss/*.scss',
                ],
                tasks: ['sass', 'typescript', 'tjs2GM', 'nanoajax2GM', 'text2GM', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('./tasks');

    grunt.registerTask('default', ['sass', 'typescript', 'tjs2GM', 'nanoajax2GM', 'text2GM', 'uglify']);

};
