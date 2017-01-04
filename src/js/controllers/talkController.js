/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.talk',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.talk',{
        url:'/talk',
        views:{
            'tabs-talk':{
                templateUrl:'talk.html',
                controller:'talkController'
            }
        }
    });
}]).controller('talkController',['$scope','$ionicLoading','HttpFactory',function ($scope,$ionicLoading,HttpFactory) {

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
    $scope.XIAN = function (e) {
        var allIten = angular.element(e.target).parent().children();
        // console.log(allIten);
        allIten.css('borderBottom','none');
        angular.element(e.target).css('borderBottom','5px solid white');
    };



    //导航列表
    var url = 'http://c.m.163.com/newstopic/list/classification.html';
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        $scope.btns = result.data;
        // console.log($scope.btns);
    });

    //内容
    var index = 10;
    $scope.isShowInfinite = true;
    $scope.loadMore = function () {
        index += 10;
        var url = 'http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-'+ index +'.html';
        HttpFactory.getData(url).then(function (result) {
            $scope.cons = result.data.expertList;
            if (index >= 100){
                $scope.isShowInfinite = false;
                // console.log("到底了！");
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.doRefresh = function () {
        index = 10;
        var url = 'http://c.m.163.com/newstopic/list/expert/5YyX5Lqs/0-'+ index +'.html';
        HttpFactory.getData(url).then(function (result) {
            $scope.cons = result.data.expertList;
            $scope.isShowInfinite = true;
            $scope.$broadcast('scroll.refreshComplete');

        });
    };




    $scope.attentionStyle = {
        "width": "60px",
        "height": "30px",
        "border-radius": "40px",
        "float": "right"
    };
    $scope.changeStyle = function (e) {
        // console.log(e.target.innerHTML);
        if(e.target.innerHTML == '+关注'){
            e.target.innerHTML="已关注";
            angular.element(e.target).css("background","gray");
        }else{
            e.target.innerHTML ='+关注';
            angular.element(e.target).css("background","rgb(239,71,58)");
        }
    };

    //下拉导航列表
    var myDiv = document.querySelector('.row');
    var button = document.querySelector('.xiala');
    var qq = document.querySelector('.ifyou');
    button.onclick = function () {
        if(myDiv.style.height == '270px'){
            myDiv.style.height = '90px';
            qq.style.transform = 'rotate(0deg)';
        }else {
            myDiv.style.height = '270px';
            qq.style.transform = 'rotate(180deg)';
        }
    }
}]);