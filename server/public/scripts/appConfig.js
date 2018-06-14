let app = angular.module('timeTrackerApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as vm'
    }).when( '/add', {
        templateUrl: '/views/addEntry.html',
        controller: 'AddController as vm'
    }).when( '/project', {
        templateUrl: '/views/manageProjects.html',
        controller: 'ProjectController as vm'
    }).when( '/report', {
        templateUrl: '/views/reports.html',
        controller: 'ReportController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    });
});
