( function() {
	'use strict';

	angular
		.module('appWeb')
		.factory('NotificationHelper', Service);

	function Service($rootScope) {

		/* Altera a quantidade de notificações */
		function _sumCount() {
			$rootScope.notifications.count = $rootScope.notifications.count + 1;
		}

		/* Limpa todas as notificações */
		function _cleanCount() {
			$rootScope.notifications = {
				count : 0,
				dateTime : new Date(),
				items : []
			};
		}

		/* Modelo padrão para uma notificação personalizada */
		function _addItemDefault(icon, title, message, description) {
			_buildNotification(icon, title, message, description);
		}

		function _addPeopleDelete(title, description) {
			_buildNotification('text-red fa-user', title, 'Houve um erro ao tentar excluir', description);
		}

		function _addPeopleGet(description) {
			_buildNotification('text-red fa-user', 'Pessoas', 'Houve um erro ao listar as pessoas', description);
		}

		function _addPeopleEdit(title, description) {
			_buildNotification('text-red fa-user', title, 'Houve um erro ao editar a pessoa', description);
		}

		function _addTasksDelete(title, description) {
			_buildNotification('text-red fa-calendar', title, 'Houve um erro ao tentar excluir', description);
		}

		function _addTasksGet(description) {
			_buildNotification('text-red fa-calendar', 'Tarefas', 'Houve um erro ao listas as tarefas', description);
		}

		function _buildNotification(icon, title, message, description) {
			_sumCount();

			$rootScope.notifications.items.push({
				dateTime : new Date(),
				icon : icon,
				title : title,
				message : message,
				description : description
			});
		}

		$rootScope.notificationsClean = _cleanCount;

		return {
			cleanCount : _cleanCount,
			addItemDefault : _addItemDefault,
			addPeopleDelete : _addPeopleDelete,
			addPeopleGet : _addPeopleGet,
			addPeopleEdit : _addPeopleEdit,
			addTasksDelete : _addTasksDelete,
			addTasksGet : _addTasksGet
		};	
	}
})();