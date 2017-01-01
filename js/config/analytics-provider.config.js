(function (window) {
	'use strict';
	
	angular
		.module('appWeb')
		.config(Config)
		.run(Run);

	function Config(AnalyticsProvider) {
        AnalyticsProvider.useAnalytics(false);
        AnalyticsProvider.setAccount('UA-86965212-1');
	}

	function Run(Analytics) {
	  	// In case you are relying on automatic page tracking, you need to inject Analytics
	  	// at least once in your application (for example in the main run() block)
	}
})();