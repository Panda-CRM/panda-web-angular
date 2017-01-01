( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('PeopleNewCtrl', Controller);

	function Controller($scope, $routeParams, $location, Notification, PeopleService) {

		$(document).ready(function() {
			$('.calendar-birth-date').datetimepicker({
	            locale: 'pt-br',
	            format: 'DD/MM/YYYY'
	        });
		});

		$scope.savePerson = function(person) {
			/* Pega a data de aniversário e a validado do passaporte avulso por causa da API de calendario */
			person.birth_date = $('.calendar-birth-date').datetimepicker('date');

			PeopleService.postPerson(person).success(function (data) {
				/* Notifica usuário os dados foi alterado */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				/* Redireciona para a lista de pessoas */
				$location.path('/people');
			}).error(function (data) {
				/* Exibe o erro para o usuário */
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.errors;
			});
		};
		
		$scope.routerAction = 'Cadastrar';
		$scope.person = {id: null, type: $routeParams.type.toUpperCase()};
	}
})();