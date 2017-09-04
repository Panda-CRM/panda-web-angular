( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('SalesListCtrl', Controller);

	function Controller($rootScope, $scope, Notification, SalesService, NotificationHelper) {
		
		$scope.loadSales = function() {
			$scope.filters.page = $scope.currentPage;
			$scope.filters.per_page = itemPerPage;
			$scope.isAllSelected = false;

			SalesService.getSales($scope.filters).success(function (data) {
				/* Seta qual a ultima pagina que contem dados */
				$scope.lastPage = data.pages.total_pages;
				/* Seta os dados no array de Sales */
				$scope.sales = data.sales;
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});
		};

		$scope.toggleAllCheckBox = function() {
			$scope.isAllSelected = !$scope.isAllSelected;
     		$scope.sales.forEach(function (item){ 
     			item.selected = $scope.isAllSelected; 
     		});
		};

		$scope.makePagination = function(page) {
			if(($scope.currentPage + page) >= 1 && ($scope.currentPage + page) <= $scope.lastPage) {
				$scope.currentPage += page;
				$scope.loadSales();
			}
		};

		$scope.importCVC = function() {
			SalesService.importCVC().success(function (data) {
				Notification.success({message: '<i class="icon fa fa-check" /> Importação realizada com sucesso!', delay: 2000});
				$scope.loadSales();
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível importar os dados', delay: 2000});
			});
		};

		var itemPerPage = 0;
		$scope.lastPage = 0;
		$scope.currentPage = 1;
		$scope.filters = {};
		$scope.sales = [];
		$scope.loadSales();
	}
})();