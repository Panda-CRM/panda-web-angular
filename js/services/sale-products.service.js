( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('SaleProductsService', Service);

	function Service($http, ConfigApp) {

		function _getSaleProducts(filters) {
			var urlPath = ConfigApp.baseUrl + 'api/v1/sale_products';

			if(filters) {
				urlPath += '?';

				angular.forEach(filters, function(value, key) {
					if(value && key) {
			        	urlPath += '&';
			        	urlPath += key + '=' + value;
			        }
			    });
			}

	        return $http.get(urlPath);
		}

		function _getSaleProduct(id) {
			return $http.get(ConfigApp.baseUrl + 'api/v1/sale_products/' + id);
		}

		function _deleteSale(id) {
			return $http.delete(ConfigApp.baseUrl + 'api/v1/sale_products/' + id);
		}

		return {
			getSaleProducts : _getSaleProducts,
			getSaleProduct : _getSaleProduct,
			deleteSale : _deleteSale,
		};	
	}
})();