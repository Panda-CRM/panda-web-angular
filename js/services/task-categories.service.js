( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('TaskCategoriesService', Service);

	function Service($http, ConfigApp) {

		function _getTaskCategories() {
	        return $http.get(ConfigApp.baseUrl + 'api/v1/task_categories');
		}

		function _getTaskCategory(id) {
			return $http.get(ConfigApp.baseUrl + 'api/v1/task_categories/' + id);
		}

		function _postTaskCategory(category) {
			return $http.post(ConfigApp.baseUrl + 'api/v1/task_categories', {task_category: category});	
		}

		function _putTaskCategory(category) {
			return $http.put(ConfigApp.baseUrl + 'api/v1/task_categories/' + category.id, {task_category : category});
		}

		function _deleteTaskCategory(id) {
			return $http.delete(ConfigApp.baseUrl + 'api/v1/task_categories/' + id);
		}

		return {
			getTaskCategories : _getTaskCategories,
			getTaskCategory : _getTaskCategory,
			postTaskCategory : _postTaskCategory,
			putTaskCategory : _putTaskCategory,
			deleteTaskCategory : _deleteTaskCategory
		};
	}
})();