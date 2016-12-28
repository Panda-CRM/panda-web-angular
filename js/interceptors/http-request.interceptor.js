(function (window) {
	'use strict';
	
	angular
		.module('mondeWeb')
		.factory('httpRequestInterceptor', interceptors);

	function interceptors($rootScope, $location, $q, $localStorage) {
	    return {
	        request: function (config) {
	            config.headers = config.headers || {};

	            if ($localStorage.token) {
	                config.headers.Authorization = 'Bearer ' + $localStorage.token;
	            }

	            /* Hacking para setar Content-Type em requisições GET */
	            if(typeof config.data === 'undefined') {
	            	config.data = '';
	            	config.headers['Content-Type'] = 'application/json; charset=utf-8';
	            }

	            return config;
	        },

	        requestError: function(rejection) {
		      	return $q.reject(rejection);
		    },
		    
	        response: function (response) {
	            if (response.status === 401) {
	                $location.path('/login');
	            }

	            return response || $q.when(response);
	        },
	        
		    responseError: function(rejection) {
		    	if(rejection.status === 401) {
		    		$location.path('/login');	
		    	}

		      	return $q.reject(rejection);
		    }
	    };
	}
})();