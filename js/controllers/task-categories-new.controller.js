( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskCategoriesNewCtrl', Controller);

	function Controller($scope, $routeParams, $location, Notification, TaskCategoriesService) {

		$scope.saveTaskCategory = function(category) {
			TaskCategoriesService.postTaskCategory(category).success(function (data) {
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				$location.path('/task-categories');
			}).error(function (data) {
				/* Exibe o erro para o usuário */
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.errors;
			});
		};
		
		$scope.routerAction = 'Cadastrar';
		$scope.category = {};
	}
})();