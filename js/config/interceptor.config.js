(function (window) {
	'use strict';
	
	angular
		.module('appWeb')
		.config(Config);

	function Config($httpProvider) {
		$httpProvider.interceptors.push('httpRequestInterceptor');
		$httpProvider.interceptors.push('loadingInterceptor');
	}
})();