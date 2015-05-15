module.exports = function(grunt) {

    grunt.registerTask('pegasus2GM', function(){
        var config = grunt.config('pegasus2GM');
        var src = grunt.file.read(config.src);
        var dest = grunt.file.read(config.dest);
        src = 'var GrowthMessage;(function(GrowthMessage){' +
            src +
            'GrowthMessage.pegasus=pegasus;}(GrowthMessage || (GrowthMessage = {})));';
        grunt.file.write(config.dest, src + "\n" + dest);
    });

};
