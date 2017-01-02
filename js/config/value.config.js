( function() {

	angular
		.module('appWeb')
		.value('ConfigApp', {
			baseUrl: 'https://panda-api.herokuapp.com/'
		});
})();