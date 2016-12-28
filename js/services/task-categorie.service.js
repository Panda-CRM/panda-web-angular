( function() {
	'use strict';

	angular
		.module('mondeWeb')
		.factory('TaskCategorieService', Service);

	function Service($http, ConfigApp) {

		function _getTaskCategories() {
	        return $http.get(ConfigApp.baseUrl + 'api/v1/task_categories');
		}

		return {
			getTaskCategories : _getTaskCategories
		};
	}
})();