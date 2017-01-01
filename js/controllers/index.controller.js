(function () {
    'use strict';
 
    angular
        .module('appWeb')
        .controller('IndexCtrl', Controller);
 
    function Controller($rootScope, $localStorage, $scope, $location, AuthenticationService) {
        
        $scope.login = function(username, password) {
            $scope.loading = true;

            AuthenticationService.Login(username, password, function (result) {
                if (result === true) {
                    /* Verifica se o usuário quer lembrar as credenciais */
                    if($scope.rememberSelected === true) {
                        saveCredentials(username, password);
                    }
                    /* Exibe usuário após logar e redireciona */
                    $rootScope.currentUser = $localStorage.currentUser;
                    /* Após autenticado com sucesso, redireciona para Tarefas */
                    $location.path('/tasks');
                } else {
                    $scope.error = 'Usuário ou senha incorreta.';
                    $scope.loading = false;
                }
            });
        };

        var saveCredentials = function(username, password) {
            $localStorage.rememberMe = true;
            $localStorage.username = username;
            $localStorage.password = password;
        };

        var autoLogin = function() {
            if($localStorage.rememberMe === true) {
                $scope.login($localStorage.username, $localStorage.password);
            }
        };

        autoLogin();
    }
})();