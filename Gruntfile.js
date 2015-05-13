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
        watch: {
            scripts: {
                files: ['./ts/*.ts'],
                tasks: ['typescript'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['typescript']);

};
