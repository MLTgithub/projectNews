/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.live',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'live.html',
                controller:'liveController'
            }
        }
    })
}]).controller('liveController',['$scope','$sce','$ionicLoading','HttpFactory',function ($scope,$sce,$ionicLoading,HttpFactory) {
    $scope.show = function () {
        $ionicLoading.show({
            template:'Loading...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.show();

    //头部的按钮下划线
    $scope.CHU = function (e) {
        var allItem = angular.element(e.target).parent().children();
        // console.log(allItem);
        // console.log(e.target);
        allItem.css("borderBottom","none");
        angular.element(e.target).css("borderBottom","5px solid white");
    };


    $scope.live = {
        slideSource:[]
    };
    var url = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        var img_title_Array = [];
        if (result.top.length){
            for (var i = 0;i < result.top.length;i++){
                var obj = {
                    title:result.top[i].roomName,
                    imgsrc:result.top[i].image
                };
                img_title_Array.push(obj);
            }
            // console.log(img_title_Array);
            $scope.live.slideSource = img_title_Array;
        }
    });
    var myurl = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(myurl).then(function (result) {
        $scope.nooes = result.sublives;
        $scope.lives = result.live_review;
        $scope.tiaos = result.future;
        // console.log($scope.tiaos);
    });

}]);