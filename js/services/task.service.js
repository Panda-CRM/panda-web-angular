( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('TaskService', Service);

	function Service($http, ConfigApp) {

		function _getTasks(filters) {
			var urlPath = ConfigApp.baseUrl + 'api/v1/tasks';

			if(filters) {
				urlPath += '?';

				angular.forEach(filters, function(value, key) {
					if(value && key) {
			        	urlPath += '&';
			        	urlPath += key + '=' + value;
			        }
			    });
			}

	        return $http.get(urlPath);
		}

		function _getTask(id) {
			return $http.get(ConfigApp.baseUrl + 'api/v1/tasks/' + id);
		}

		function _postTask(task) {
			return $http.post(ConfigApp.baseUrl + 'api/v1/tasks', {task: task});	
		}

		function _putTask(task) {
			return $http.put(ConfigApp.baseUrl + 'api/v1/tasks/' + task.id, {task : task});
		}

		function _deleteTask(id) {
			return $http.delete(ConfigApp.baseUrl + 'api/v1/tasks/' + id);
		}

		return {
			getTasks : _getTasks,
			getTask : _getTask,
			postTask : _postTask,
			putTask : _putTask,
			deleteTask : _deleteTask
		};	
	}
})();