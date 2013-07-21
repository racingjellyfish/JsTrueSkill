module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			uses_defaults: {}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		nodeunit: {
			all: ['test/server/**/*Tests.js']
		},
		qunit: {
			options: {
				urls:	['http://localhost:8000/test/ui/index.html'],
				timeout: 10000,
				'--cookies-file': 'misc/cookies.txt'
			},
			all: ['test/ui/**/*.html']
		},
		jshint: {
			files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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
			tasks: ['jshint', 'qunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('uitest', ['jshint', 'connect', 'qunit']);

	grunt.registerTask('servertest', ['jshint', 'nodeunit']);

	grunt.registerTask('default', ['jshint', 'servertest', 'connect', 'qunit', 'concat', 'uglify']);

	grunt.event.on('qunit.spawn', function (url) {
		grunt.log.ok("\nRunning ui test: " + url);
	});

};
