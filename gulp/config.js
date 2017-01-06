module.exports = {
	deploy: {
		distDirectory : 'dist/',
		testHintItems : ['js/**/*.js'],
	    packageName: 'zipped_extension.zip',
	    packItems: ['dist/*'],
	    appID: 'kdhjhnpeoocmpocejjcbnaeielfgjkcc',
	    OAuth: {
	        "client_secret":"",
	        "token_uri":"",
	        "client_id":"",
	        "refresh_token":""
	    },
	    concatLibJsName : 'lib.min.js',
	    concatLibJsItems : [
		    'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/angular/angular.min.js',		
			'node_modules/moment/min/moment.min.js',
			'node_modules/angular-route/angular-route.min.js',
			'node_modules/angular-messages/angular-messages.min.js',
			'node_modules/ngstorage/ngStorage.min.js',
			'node_modules/angucomplete-alt/dist/angucomplete-alt.min.js',
			'node_modules/moment/locale/pt-br.js',
			'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
			'node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
			'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
			'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
			'node_modules/angular-google-analytics/dist/angular-google-analytics.min.js'
		],
		compressJsName : 'all.min.js',
		compressJsItems : [
			'js/ui/app.js',
			'js/app.js',
			'js/**/*.js'
		],
		compressCssName : 'styles.min.css',
		compressCssItems : [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'css/skins/skin-blue.min.css',
			'node_modules/angucomplete-alt/angucomplete-alt.css',
			'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
			'node_modules/angular-ui-notification/dist/angular-ui-notification.min.css',
			'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
		]
    }
};