( function() {

	angular
		.module('mondeWeb')
		.value('ConfigApp', {
			baseUrl: 'http://localhost:8080/'
		});
})();