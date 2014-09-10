module.exports = function(grunt)
{
	grunt.registerTask(
		'combine',
		'Builds a combined library file without minification', [
			'concat:combine',
			'replace:combine',
			'concat:worker',
			'replace:worker',
			'concat:displaygeneric',
			'replace:displaygeneric',
			'concat:displaycreatejs',
			'replace:displaycreatejs',
			'concat:displaypixi',
			'replace:displaypixi',
			'concat:tasks',
			'replace:tasks',
			'concat:states',
			'replace:states',
			'concat:sound',
			'replace:sound',
			'concat:captions',
			'replace:captions',
			'concat:cutscene',
			'replace:cutscene',
			'concat:translate',
			'replace:translate'
		]
	);
};