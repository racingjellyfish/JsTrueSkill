module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			uses_defaults: {}
		},
		nodeunit: {
			all: ['test/**/*Tests.js']
		},
		jshint: {
			files: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				ignores: ['test/libs/**'],
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'nodeunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'nodeunit']);
};
