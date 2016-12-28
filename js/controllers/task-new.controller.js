( function() {
	'use strict';

	angular
		.module('mondeWeb')
		.controller('TaskNewCtrl', Controller);

	function Controller($scope, $location, $localStorage, TaskService, taskCategories, taskAssignees, Notification, TaskHelper) {

		$( document ).ready(function() {
			$('#calendar-date-due').datetimepicker({
	            locale: 'pt-br',
	            format: 'DD/MM/YYYY HH:mm',
	            defaultDate : new Date()
	        });
		});

		/* Salva o comentário na timeline */
		$scope.saveComment = function(comment) {
			if(comment) {
				var commentTemp = TaskHelper.buildComment(comment, $localStorage.currentUser.name);

				if(typeof $scope.task.task_historics === 'undefined' || $scope.task.task_historics.length === 0) {
					$scope.task.task_historics = [];	
				}
				
				commentsTemp.push(commentTemp);
				$scope.task.task_historics.push(commentTemp);
				$scope.task.task_historics = TaskHelper.buildTimelineComments($scope.task.task_historics);

				$scope.comment = '';
			}
		};

		/* Seta tarefa com a pessoa selecionada no autocomplete */
		$scope.selectedPerson = function(selected) {
	    	if (selected) {
	        	$scope.task.person = selected.originalObject;
	      	}
	    };

		$scope.saveTask = function(task) {
			/* Pega o vencimento avulso por causa da API de calendario */
			task.due = $('#calendar-date-due').datetimepicker('date');
			/* Salva apenas os novos comentário para não duplicar no post */
			task.task_historics = commentsTemp;
			/* Verifica se a tarefa foi concluída para setar uma data de conclusão */
			task.completed_at = $scope.completed ? (task.completed_at ? task.completed_at : new Date()) : '';
			/* Posta os dados no server */
			TaskService.postTask(task).success(function (data) {
				/* Notifica usuário os dados foi alterado */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				/* Redireciona para a lista de tarefas */
				$location.path('/tasks');
			}).error(function (data) {
				/* Exibe o erro para o usuário */
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.error;
			});
		};

		var commentsTemp = [];
		$scope.routerAction = 'Cadastrar';
		$scope.task = {};
		$scope.taskCategories = taskCategories.data.task_categories;
		$scope.taskAssignees = taskAssignees.data.people;
	}
})();