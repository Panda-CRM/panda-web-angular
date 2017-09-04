( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('SaleProductsListCtrl', Controller);

	function Controller($rootScope, $scope, Notification, SaleProductsService, NotificationHelper) {
		
		$scope.loadSaleProducts = function() {
			$scope.filters.page = $scope.currentPage;
			$scope.filters.per_page = itemPerPage;
			$scope.isAllSelected = false;

			SaleProductsService.getSaleProducts($scope.filters).success(function (data) {
				/* Seta qual a ultima pagina que contem dados */
				$scope.lastPage = data.pages.total_pages;
				/* Seta os dados no array de Sales */
				$scope.saleProducts = data.sale_products;
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

		var itemPerPage = 0;
		$scope.lastPage = 0;
		$scope.currentPage = 1;
		$scope.filters = {};
		$scope.sales = [];
		$scope.loadSaleProducts();
	}
})();