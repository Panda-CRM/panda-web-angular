( function() {
	'use strict';

	angular
		.module('appWeb')
		.controller('TaskDashboardCtrl', Controller);

	function Controller($scope, Notification, TaskService) {		
		$scope.loadReports = function() {
			TaskService.reportTaskGeneral().success(function (data) {
				tasksChartCompleted(data);
				tasksChartAll(data);
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});

			TaskService.reportTaskCategory().success(function (data) {
				tasksChartCategory(data);
				tasksChartCategory2();
			}).error(function (data) {
				Notification.error({message: '<i class="icon fa fa-warning" /> Não foi possível carregar os dados', delay: 2000});
			});
		};

		$scope.filters = {};
		$scope.loadReports();
	}
	/**
	 * Gráfico mostra concluída e não concluída
	 */
	function tasksChartCompleted(data) {
		var labels = ["Concluída", "Não concluída"];
		var data = [data.completed, data.not_completed];
		var colors = ["#4BC0C0", "#36A2EB", "#FFCE56"];

		var dataChart = {
		    labels: labels,
		    datasets: [
		        {
		            data: data,
		            backgroundColor: colors,
		            hoverBackgroundColor: colors
		        }]
		};

		var ctx = document.getElementById("tasks-chart-completed");
		var chartCompleted = new Chart(ctx, {
		    type: 'pie',
		    data: dataChart
		});
	}
	/**
	 * Gráfico conluída, não concluída e vencidas
	 */
	function tasksChartAll(item) {
		var labels = ["Concluída", "Não concluída", "Vencidas"];
		var colors = ["#4BC0C0", "#36A2EB", "#FFCE56"];
		var data = [item.completed, item.not_completed - item.overdue, item.overdue];

		var dataChart = {
		    labels: labels,
		    datasets: [
		        {
		            data: data,
		            backgroundColor: colors,
		            hoverBackgroundColor: colors
		        }]
		};

		var ctx = document.getElementById("tasks-chart-all");
		var chartAll = new Chart(ctx, {
		    type: 'pie',
		    data: dataChart
		});
	}
	/**
	 * Gráfico dos atendimentos por categoria
	 */
	function tasksChartCategory(items) {
		var labels = [];
		var data = [];
		var colors = ["#4BC0C0", "#36A2EB", "#FFCE56"];
		
		items.forEach(function(item, index) {
			labels.push(item.description);
			data.push(item.total);
		});

		var dataChart = {
		    labels: labels,
		    datasets: [
		        {
		            data: data,
		            backgroundColor: colors,
		            hoverBackgroundColor: colors
		        }]
		};

		var ctx = document.getElementById("tasks-chart-category");
		var chartCategory = new Chart(ctx, {
		    type: 'pie',
		    data: dataChart
		});
	}
	/**
	 * Gráfico de linhas
	 */
	function tasksChartCategory2() {
		var dataChart = {
		    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
		    datasets: [
		        {
		            label: "Atendimentos",
		            fill: true,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            data: [65, 59, 80, 81, 56, 55, 40],
		        }
		    ]
		};

		var ctx = document.getElementById("tasks-chart-line");
		var charLine = new Chart(ctx, {
		    type: 'line',
		    data: dataChart
		});
	}
})();