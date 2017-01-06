( function() {

	angular
		.module('appWeb')
		.value('ConfigApp', {
			baseUrl: 'http://localhost:8080/'
		});
})();