/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.my',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.my',{
        url:'/my',
        views:{
            'tabs-my':{
                templateUrl:'my.html',
                controller:'myController'
            }
        }
    }).state('tabs.login',{
        url:'/login',
        views:{
            'tabs-my':{
                templateUrl:'login.html',
                controller:'myController'
            }
        }
    });
}]).controller('myController',['$scope','$ionicBackdrop',function ($scope,$ionicBackdrop) {
    var num = 0;
    $scope.action = function () {
        num++;
        if(num%2==0){
            $ionicBackdrop.release();
        }else{
            $ionicBackdrop.retain();
        }
    }
}]);