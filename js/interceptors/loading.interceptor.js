(function (window) {
	'use strict';
	
	angular
		.module('appWeb')
		.factory('loadingInterceptor', interceptors);

	function interceptors($q, $rootScope) {
	    return {
	        request: function (config) {
	        	$rootScope.loading = true;
	            return config;
	        },

	        requestError: function(rejection) {
	        	$rootScope.loading = false;
		      	return $q.reject(rejection);
		    },
		    
	        response: function (response) {
	        	$rootScope.loading = false;
	            return response || $q.when(response);
	        },
	        
		    responseError: function(rejection) {
		    	$rootScope.loading = false;
		      	return $q.reject(rejection);
		    }
	    };
	}
})();