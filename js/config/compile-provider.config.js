(function () {
	'use strict';

	angular
		.module('appWeb')
		.config(['$compileProvider', function($compileProvider) {   
		        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|mailto|chrome-extension):/);
		    }
		]);
})();