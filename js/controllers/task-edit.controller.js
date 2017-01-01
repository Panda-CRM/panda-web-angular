( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskEditCtrl', Controller);

	function Controller($scope, $location, $localStorage, $routeParams, $filter, TaskService, taskCategories, taskAssignees, Notification, TaskHelper) {

		/* Exibe os detalhes da tarefa na view */
		TaskService.getTask($routeParams.id).success(function (data) {
			$scope.task = data.task;
			
			$( document ).ready(function() {
				$('#calendar-date-due').datetimepicker({
		            locale: 'pt-br',
		            format: 'DD/MM/YYYY HH:mm',
		            defaultDate : $scope.task.due
		        });
			});

			$scope.task.completed_at = $scope.task.completed_at ? $filter('date')(new Date($scope.task.completed_at), 'dd/MM/yyyy HH:mm') : '';
			$scope.task.task_historics = TaskHelper.buildTimelineComments($scope.task.task_historics);
			$scope.completed = $scope.task.completed_at ? true : false;
		}).error(function (data) {
			$scope.error = 'Não foi possível carregar os dados!';
			NotificationHelper.addTasksGet(data.errors);
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
			//task.completed_at = $scope.completed ? (task.completed_at ? task.completed_at : new Date()) : delete task.completed_at;
			
			if ($scope.completed) {
				if (!task.completed_at) {
					task.completed_at = new Date();
				}
			} else {
				delete task.completed_at;
			}

			/* Posta os dados no server */
			TaskService.putTask(task).success(function (data) {
				/* Notifica usuário os dados foi alterado */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro alterado com sucesso!', delay: 2000});
				/* Redireciona para a lista de tarefas */
				$location.path('/tasks');
			}).error(function (data) {
				/* Exibe o erro para o usuário */
				$scope.error = data.status == 403 ? 'Você não tem permissão para executar essa ação.' : data.errors;
				NotificationHelper.addTasksEdit(task.title, data.errors);
			});
		};

		/* Função para excluir uma tarefa */
		$scope.deleteTask = function(task) {
			TaskService.deleteTask(task.id).success(function () {
				/* Notifica usuário */
				Notification.success({message: '<i class="icon fa fa-check" /> Registro excluido com sucesso!', delay: 2000});
				/* Redireciona para a lista de tarefas */
				setTimeout(function () {
					$location.path('/tasks');}, 5
				);
			}).error(function (data) {
				/* Notifica usuário do problema */
				Notification.error({message: '<i class="icon fa fa-warning" /> Houve um erro ao excluir os registros', delay: 2000});
				NotificationHelper.addTasksDelete(task.title, data.errors);
			});
		};

		var commentsTemp = [];
		$scope.routerAction = 'Editar';
		$scope.taskCategories = taskCategories.data.task_categories;
		$scope.taskAssignees = taskAssignees.data.people;
	}
})();