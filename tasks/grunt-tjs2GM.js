module.exports = function(grunt) {

    grunt.registerTask('tjs2GM', function(){
        var config = grunt.config('tjs2GM');
        var src = grunt.file.read(config.src);
        var dest = grunt.file.read(config.dest);
        src = src.replace('window.t', 'GrowthMessage.t');
        grunt.file.write(config.dest, src + "\n" + dest);
    });

};
