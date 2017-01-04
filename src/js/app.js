/**
 * Created by lx on 2016/12/2.
 */
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.news','myApp.live','myApp.talk','myApp.my','myApp.newsDetail']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state('tabs',{
        url: '/tabs',
        abstract: true,
        templateUrl: 'tabs.html',
        controller: 'tabsController'
    });
    $urlRouterProvider.otherwise('/tabs/news');
}]).controller('tabsController',['$scope',function ($scope) {

}]);