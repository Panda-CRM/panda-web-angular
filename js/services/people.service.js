( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('PeopleService', Service);

	function Service($http, ConfigApp) {

		function _getPeople(filters) {
			var urlPath = ConfigApp.baseUrl + 'api/v1/people';

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

		function _getPerson(id) {
			return $http.get(ConfigApp.baseUrl + 'api/v1/people/' + id);
		}

		function _postPerson(person) {
			return $http.post(ConfigApp.baseUrl + 'api/v1/people', person);	
		}

		function _putPerson(person) {
			return $http.put(ConfigApp.baseUrl + 'api/v1/people/' + person.id, person);
		}

		function _deletePeople(id) {
			return $http.delete(ConfigApp.baseUrl + 'api/v1/people/' + id);
		}

		return {
			getPeople : _getPeople,
			getPerson : _getPerson,
			postPerson : _postPerson,
			putPerson : _putPerson,
			deletePeople : _deletePeople
		};
	}
})();