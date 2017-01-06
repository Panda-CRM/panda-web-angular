( function() {

	angular
		.module('appWeb')
		.config(Config);

	function Config($routeProvider) {
		
		$routeProvider.otherwise({redirectTo: '/tasks'});

		/*
		$routeProvider.when('/', {
			templateUrl: 'view/dashboard.view.html'
		});
		*/

		$routeProvider.when('/notifications', {
			templateUrl: 'view/notifications.view.html'
		});

		$routeProvider.when('/login', {
			templateUrl: 'view/login.view.html',
            controller: 'IndexCtrl'
		});

		$routeProvider.when('/logout', {
			resolve: {
				logout: function(AuthenticationService) {
					return AuthenticationService.Logout();
				}
			}
		});

		$routeProvider.when('/people', {
			templateUrl: 'view/people-list.view.html',
            controller: 'PeopleListCtrl'
		});

		$routeProvider.when('/people/:type/new', {
			templateUrl: 'view/people-edit.view.html',
            controller: 'PeopleNewCtrl'
		});

		$routeProvider.when('/people/:id/edit', {
			templateUrl: 'view/people-edit.view.html',
            controller: 'PeopleEditCtrl'
		});

		$routeProvider.when('/tasks', {
			templateUrl: 'view/tasks-list.view.html',
            controller: 'TaskListCtrl'
		});

		$routeProvider.when('/tasks/new', {
			templateUrl: 'view/tasks-edit.view.html',
            controller: 'TaskNewCtrl',
			resolve: {
				taskCategories: function(TaskCategoriesService) {
					return TaskCategoriesService.getTaskCategories();
				},
				taskAssignees : function(PeopleService) {
					return PeopleService.getPeople({'only_users' : 'true'});
				}
			}
		});

		$routeProvider.when('/tasks/:id/edit', {
			templateUrl: 'view/tasks-edit.view.html',
            controller: 'TaskEditCtrl',
			resolve: {
				taskCategories: function(TaskCategoriesService) {
					return TaskCategoriesService.getTaskCategories();
				},
				taskAssignees : function(PeopleService) {
					return PeopleService.getPeople({'only_users' : 'true'});
				}
			}
		});

		$routeProvider.when('/task-categories', {
			templateUrl: 'view/task-categories-list.view.html',
            controller: 'TaskCategoriesListCtrl'
		});

		$routeProvider.when('/task-categories/new', {
			templateUrl: 'view/task-categories-edit.view.html',
            controller: 'TaskCategoriesNewCtrl'
		});
	}
})();