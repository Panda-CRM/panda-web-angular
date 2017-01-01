( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('PeopleListCtrl', Controller);

	function Controller($rootScope, $scope, Notification, PeopleService, NotificationHelper) {
		
		$scope.loadPeople = function() {
			$scope.filters.page = $scope.currentPage;
			$scope.filters.per_page = itemPerPage;
			$scope.isAllSelected = false;

			PeopleService.getPeople($scope.filters).success(function (data) {
				/* Seta qual a ultima pagina que contem dados */
				//$scope.lastPage = data.meta.pagination.total_pages;
				/* Seta os dados no array de People */
				$scope.people = data.people;
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});
		};

		/* Função para excluir uma ou mais tarefas */
		$scope.deletePeople = function(people) {
			people.forEach(function (item) {
				if(item.selected) {
					PeopleService.deletePeople(item.id).success(function () {
						/* Remove o registro excluir do array */
						people.splice(people.indexOf(item), 1);
					}).error(function (data) {
						/* Notifica usuário do problema */
						NotificationHelper.addPeopleDelete(item.name, data.errors);
					});
				}
			});
		};

		$scope.toggleAllCheckBox = function() {
			$scope.isAllSelected = !$scope.isAllSelected;
			
     		$scope.people.forEach(function (item){ 
     			item.selected = $scope.isAllSelected; 
     		});
		};

		$scope.makePagination = function(page) {
			if(($scope.currentPage + page) >= 1 && ($scope.currentPage + page) <= $scope.lastPage) {
				$scope.currentPage += page;
				$scope.loadPeople();
			}
		};

		var itemPerPage = 0;
		$scope.lastPage = 0;
		$scope.currentPage = 1;
		$scope.filters = {};
		$scope.people = [];
		$scope.loadPeople();
	}
})();