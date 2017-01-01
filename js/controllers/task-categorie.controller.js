( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskCategorieCtrl', Controller);

	function Controller($scope, TaskCategorieService) {

		$scope.loadTaskCategories = function() {
			TaskCategorieService.getTaskCategories().success(function (data) {
				$scope.taskCategories = data.task_categories;
			}).error(function (data) {
				$scope.error = 'Não foi possível carregar os dados!';
			});
		};
	}
})();