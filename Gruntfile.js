module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['./ts/*.ts'],
                dest: './dist/growthmessage.js',
                options: {
                    sourceMap: true,
                    declaration: false,
                },
            },
        },
        uglify: {
            dist: {
                files: {
                    './dist/growthmessage.min.js': ['./dist/growthmessage.js']
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
