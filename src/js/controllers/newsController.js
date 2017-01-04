/**
 * Created by lx on 2016/12/3.
 */
angular.module('myApp.news',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    }).state('tabs.search',{
        url:'/search',
        views:{
            'tabs-news':{
                templateUrl:'search.html'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$location','$ionicViewSwitcher','$state','$ionicLoading','$ionicScrollDelegate','HttpFactory',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$location,$ionicViewSwitcher,$state,$ionicLoading,$ionicScrollDelegate,HttpFactory) {
    //数据请求前的阴影
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.show();


    //下拉列表
    var btns = document.querySelector('.btns');
    $scope.novx = function () {
        btns.style.height = '600px';
    };
    $scope.novy = function () {
        btns.style.height = '0px';
    };
    //下拉列表的内容
    var change = document.querySelector('.change');
    $scope.huan = function (e) {
        // console.log(e.target.innerHTML);
        if(e.target.innerHTML=='切换栏目'){
            e.target.innerHTML='请添加';
            $scope.lutong = !$scope.lutong;
        }else {
            e.target.innerHTML='切换栏目';
            $scope.lutong = !$scope.lutong;
        }
    };


    var url = 'http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html';
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        $scope.tous = result.tList;
        $scope.tous.splice(20,1);
        // console.log($scope.tous);
    });

    $scope.news = {
        newsArray:'',
        adsArray:[],
        index:0,
        isFirst:true
    };
    //
    var url = 'http://c.m.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10&fn=1&prog=LMA1&passport=&devId=eW7qcXmjWleAjCxp25EgTBBywawDoVwZiZ9SMikG4cGiOa69wsn%2FdeHaaNGRMr2hIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=DJEPdRawaRYCJZwF3SQobA%3D%3D&lon=7J7OmyytD8SqP0pSV1cJJA%3D%3D';
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result.T1348647909107;
        $scope.news.adsArray = $scope.news.newsArray[0].ads;
        // console.log(result);
        // console.log($scope.news.newsArray);
        // console.log($scope.news.adsArray);

        // var img_title_Array = [];
        // if (!$scope.news.adsArray.length){
        //     if(result[0].ads){
        //         // //由于网易新闻有时候除了第一次之外没有头条用个数组存着
        //         // $scope.news.adsArray = result[0].ads;
        //         if (result[0].ads.length){
        //             for (var k = 0;k < result[0].ads.length;k++){
        //                 var obj = {
        //                     title:result[0].ads[k].title,
        //                     imgsrc:result[0].ads[k].imgsrc
        //                 };
        //                 img_title_Array.push(obj);
        //
        //             }
        //             $scope.news.adsArray = img_title_Array;
        //         }
        //     }
        // }
    });

    //请求的内容
    var index = 0;
    $scope.items = [];
    $scope.isShowInfinite = true;
    $scope.loadMore = function () {
        index += 1;
        var url = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset='+ index +'&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
        HttpFactory.getData(url).then(function (result) {
            $scope.items = $scope.items.concat(result.tid);
            // $scope.items = result.tid;
            $scope.items.splice(0,1);
            // console.log(result);
            if (index >= 7){
                $scope.isShowInfinite = false;
                // console.log("到底了！");
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.doRefresh = function () {
        index = 10;
        var url = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&offset='+ index +'&size=30';
        HttpFactory.getData(url).then(function (result) {
            $scope.items = result.tid;
            $scope.isShowInfinite = true;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.goToNewsDetail = function (index) {

        var mlt = $scope.items[index].docid;
        $state.go('newsDetail',{'data':mlt});
        // console.log(mlt);
        $ionicViewSwitcher.nextDirection("forward")
    };


    // $scope.dragOpenSlide = function () {
    //     //滑动content的时候能滑动页面
    //     $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
    // };
    // $scope.slideChanged = function () {
    //     //滑动页面完毕关闭底层mainSlideBox的滑动
    //     $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
    //
    // };



}]);