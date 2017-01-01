(function () {
	'use strict';

	angular
		.module('appWeb')
		.factory('AuthenticationService', Service);

	function Service($rootScope, $http, $localStorage, $location, PeopleService, NotificationHelper, ConfigApp) {

		function _Login(username, password, callback) {

			var auth = {
				'username' : username,
				'password' : password
			}

			return $http.post(ConfigApp.baseUrl + 'api/v1/auth/auth_token', auth).success( function(response) {
				if(response.token) {
					$localStorage.token = response.token;

					PeopleService.getPerson(response.user_id).success( function (user) {
						$localStorage.currentUser = user.person;

						callback(true);
					});

					callback(true);
				} else {
						callback(false);
					}
			}).error( function() {
				callback(false);
			});
		}

		function _Logout() {
			delete $localStorage.token;
			delete $localStorage.currentUser;
			delete $localStorage.username;
			delete $localStorage.password;
			delete $localStorage.rememberMe;
			$rootScope.currentUser = $localStorage.currentUser;
			NotificationHelper.cleanCount();
			$location.path('/login');
		}

		return {
			Login : _Login,
			Logout : _Logout
		};
	}
})();