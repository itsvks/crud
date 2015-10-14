'use strict';

var app = angular.module('django-angular-crud', [ 'ui.router', 'ui.bootstrap']);


// Used for configuring the interpolation markup. Defaults to {{ and }}.
app.config(['$interpolateProvider', function($interpolateProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('person', {
            url: '/',
            templateUrl: 'static/app/partials/person.html',
            controller: 'MasterCtrl'
        });
}]);
