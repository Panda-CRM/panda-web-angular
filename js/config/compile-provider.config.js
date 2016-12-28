(function () {
	'use strict';

	angular
		.module('mondeWeb')
		.config(['$compileProvider', function($compileProvider) {   
		        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
		    }
		]);
})();