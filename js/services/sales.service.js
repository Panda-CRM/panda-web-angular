( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('SalesService', Service);

	function Service($http, ConfigApp) {

		function _getSales(filters) {
			var urlPath = ConfigApp.baseUrl + 'api/v1/sales';

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

		function _getSale(id) {
			return $http.get(ConfigApp.baseUrl + 'api/v1/sales/' + id);
		}

		function _postSale(sale) {
			return $http.post(ConfigApp.baseUrl + 'api/v1/sales', sale);	
		}

		function _putSale(sale) {
			return $http.put(ConfigApp.baseUrl + 'api/v1/sales/' + sale.id, sale);
		}

		function _deleteSale(id) {
			return $http.delete(ConfigApp.baseUrl + 'api/v1/sales/' + id);
		}

		function _importCVC() {
			return $http.get(ConfigApp.baseUrl + 'api/v1/integrations/cvc/import');
		}

		return {
			getSales : _getSales,
			getSale : _getSale,
			postSale : _postSale,
			putSale : _putSale,
			deleteSale : _deleteSale,
			importCVC : _importCVC
		};	
	}
})();