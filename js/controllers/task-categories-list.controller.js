( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskCategoriesListCtrl', Controller);

	function Controller($rootScope, $scope, Notification, TaskCategoriesService, NotificationHelper) {
		
		$scope.loadTaskCategories = function() {
			$scope.filters.page = $scope.currentPage;
			$scope.filters.per_page = itemPerPage;
			$scope.isAllSelected = false;

			TaskCategoriesService.getTaskCategories($scope.filters).success(function (data) {
				/* Seta qual a ultima pagina que contem dados */
				$scope.lastPage = data.meta.pagination.total_pages;
				/* Seta os dados no array de TaskCategories */
				$scope.taskCategories = data.task_categories;
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});
		};

		$scope.deleteTaskCategories = function(cagories) {
			cagories.forEach(function (item) {
				if(item.selected) {
					TaskCategoriesService.deleteTaskCategory(item.id).success(function () {
						/* Remove o registro excluir do array */
						cagories.splice(cagories.indexOf(item), 1);
					}).error(function (data) {
						/* Notifica usuário do problema */
						NotificationHelper.addTasksDelete(item.title, data.errors);
					});
				}
			});
		};

		$scope.toggleAllCheckBox = function() {
			$scope.isAllSelected = !$scope.isAllSelected;
			
     		$scope.taskCategories.forEach(function (item){ 
     			item.selected = $scope.isAllSelected; 
     		});
		};

		$scope.makePagination = function(page) {
			if(($scope.currentPage + page) >= 1 && ($scope.currentPage + page) <= $scope.lastPage) {
				$scope.currentPage += page;
				$scope.loadTaskCategories();
			}
		};

		var itemPerPage = 0;
		$scope.lastPage = 0;
		$scope.currentPage = 1;
		$scope.filters = {};
		$scope.taskCategories = [];
		$scope.loadTaskCategories();
	}
})();