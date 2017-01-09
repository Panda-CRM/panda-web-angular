( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskListCtrl', Controller);

	function Controller($scope, TaskService, TaskHelper, Notification, NotificationHelper) {

		$('#calendar-start-date').datetimepicker({
            locale: 'pt-br',
            format: 'DD/MM/YYYY'
        });

        $('#calendar-end-date').datetimepicker({
            locale: 'pt-br',
            format: 'DD/MM/YYYY'
        });

		/* Carrega as tarefas na view */
		$scope.loadTasks = function() {
			$scope.filters.page = $scope.currentPage;
			$scope.filters.per_page = itemPerPage;
			$scope.isAllSelected = false;

			$scope.filters.start_date = $('#calendar-start-date').datetimepicker('date');
			$scope.filters.end_date = $('#calendar-end-date').datetimepicker('date');

			if ($scope.filters.start_date != null) {
				var d = new Date($scope.filters.start_date);
				$scope.filters.start_date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
			}

			if ($scope.filters.end_date != null) {
				var d = new Date($scope.filters.end_date);
				$scope.filters.end_date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
			}

			TaskService.getTasks($scope.filters).success(function (data) {
				/* Seta qual a ultima pagina que contem dados */
				$scope.lastPage = data.meta.pagination.total_pages;
				/* Verifica a situação da tarefa */
				TaskHelper.checkTaskStatus(data.tasks);
				/* Atualiza a quantidade de tarefas não visulizadas */
				$scope.newTasksCount = TaskHelper.tasksNotVisualizedCount(data.tasks);
				/* Seta os dados no array de Tasks */
				$scope.tasks = data.tasks;
			}).error(function (data) {
				/* Informa erro se não conseguir carregar os dados da API */
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});
		};

		/* Função para excluir uma ou mais tarefas */
		$scope.deleteTasks = function(tasks) {
			tasks.forEach(function (item) {
				if(item.selected) {
					TaskService.deleteTask(item.id).success(function () {
						/* Remove o registro excluir do array */
						tasks.splice(tasks.indexOf(item), 1);
						/* Atualiza quantidade de tarefas não visualizadas */
						$scope.newTasksCount = TaskHelper.tasksNotVisualizedCount(tasks);
					}).error(function (data) {
						/* Notifica usuário do problema */
						NotificationHelper.addTasksDelete(item.title, data.errors);
					});
				}
			});
		};

		$scope.toggleAllCheckBox = function() {
			$scope.isAllSelected = !$scope.isAllSelected;
			
     		$scope.tasks.forEach(function (item){ 
     			item.selected = $scope.isAllSelected; 
     		});
		};

		$scope.makePagination = function(page) {
			if(($scope.currentPage + page) >= 1 && ($scope.currentPage + page) <= $scope.lastPage) {
				$scope.currentPage += page;
				$scope.loadTasks();
			}
		};

		var itemPerPage = 0;
		$scope.lastPage = 0;
		$scope.currentPage = 1;
		$scope.filters = {};
		$scope.tasks = [];
		$scope.loadTasks();
	}
})();