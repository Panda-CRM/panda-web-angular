( function() {
	'use strict';

	angular
		.module('mondeWeb')
		.controller('PeopleEditCtrl', Controller);

	function Controller($scope, $location, $routeParams, Notification, PeopleService, NotificationHelper) {
		
		/* Exibe os detalhes da tarefa na view */
		PeopleService.getPerson($routeParams.id).success(function (data) {
			$scope.person = data.person;

			$( document ).ready(function() {
				$('.calendar-birth-date').datetimepicker({
		            locale: 'pt-br',
		            format: 'DD/MM/YYYY',
		            defaultDate : $scope.person.birth_date
		        });
			});

			PeopleService.getPerson($scope.person.registered_by).success(function (data) {
				$scope.person.registered_name = data.person.name;
			});			
		}).error(function (data) {
			$scope.error = 'Não foi possível carregar os dados!';
			NotificationHelper.addPeopleGet(data.error);
		});

		$scope.savePerson = function(person) {
			/* Pega a data de aniversário e a validado do passaporte avulso por causa da API de calendario */
			person.birth_date = $('.calendar-birth-date').datetimepicker('date');

			PeopleService.putPerson(person).success(function (data) {
				/* Notifica usuário os dados foi alterado */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				/* Redireciona para a lista de pessoas */
				$location.path('/people');
			}).error(function (data) {
				/* Exibe o erro para o usuário */
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.error;
				NotificationHelper.addPeopleEdit(person.name, data.error);
			});
		};

		/* Função para excluir uma pessoa */
		$scope.deletePerson = function(person) {
			PeopleService.deletePeople(person.id).success(function () {
				/* Notifica usuário */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro excluido com sucesso!', delay: 2000});
				/* Redireciona para a lista de pessoas */
				setTimeout(function () {
					$location.path('/people');}, 5
				);
			}).error(function (data) {
				/* Notifica usuário do problema */
				Notification.error({message: '<i class="icon fa fa-warning" /> Houve um erro ao excluir o registro', delay: 2000});
				NotificationHelper.addPeopleDelete(person.name, data.error);
			});
		};

		$scope.routerAction = 'Editar';
	}
})();