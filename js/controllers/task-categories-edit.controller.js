( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskCategoriesEditCtrl', Controller);

	function Controller($scope, $location, $routeParams, Notification, TaskCategoriesService, NotificationHelper) {
		
		
		TaskCategoriesService.getTaskCategory($routeParams.id).success(function (data) {
			$scope.taskCategory = data.task_category;	
		}).error(function (data) {
			$scope.error = 'Não foi possível carregar os dados!';
		});

		$scope.saveTaskCategory = function(taskCategory) {
			TaskCategoriesService.putTaskCategory(taskCategory).success(function (data) {
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				
				$location.path('/task-categories');
			}).error(function (data) {
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.errors;
			});
		};

		
		$scope.deleteTaskCategory = function(taskCategory) {
			TaskCategoriesService.deleteTaskCategory(taskCategory.id).success(function () {
				Notification.success({message: '<i class="icon fa fa-check" /> Registro excluido com sucesso!', delay: 2000});
				
				$location.path('/task-categories');
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Houve um erro ao excluir o registro', delay: 2000});
			});
		};

		$scope.routerAction = 'Editar';
	}
})();