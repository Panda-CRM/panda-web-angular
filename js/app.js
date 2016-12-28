(function (window) {
	'use strict';

	var app = angular
		.module('mondeWeb', ['ngRoute', 'ngMessages', 'ngStorage', 'angucomplete-alt', 'ui-notification', 'ui.bootstrap', 'angular-google-analytics'])
		.run(run);

	function run($rootScope, $http, $location, $localStorage, NotificationHelper) {
		if ($localStorage.currentUser) {
			$rootScope.currentUser = $localStorage.currentUser;
		}
		 
		// redirect to login page if not logged in and trying to access a restricted page
		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			var publicPages = ['/login'];
			var restrictedPage = publicPages.indexOf($location.path()) === -1;
			
			if (restrictedPage && !$localStorage.currentUser && !localStorage.token) {
				$location.path('/login');
			}
		});

		/* Limpa o histórico de notificações */
		NotificationHelper.cleanCount();
	}
})();