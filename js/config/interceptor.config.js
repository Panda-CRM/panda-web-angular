(function (window) {
	'use strict';
	
	angular
		.module('mondeWeb')
		.config(Config);

	function Config($httpProvider) {
		$httpProvider.interceptors.push('httpRequestInterceptor');
		$httpProvider.interceptors.push('loadingInterceptor');
	}
})();