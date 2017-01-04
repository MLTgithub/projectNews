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
/**
 * Created by lx on 2016/12/7.
 */
angular.module('myApp.newsDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('newsDetail',{
        url:'/newsDetail',
        templateUrl:'newsDetail.html',
        controller:'newsDetailController',
        params:{'data':null}
    });
}]).controller('newsDetailController',['$scope','$sce','$stateParams','$ionicLoading','HttpFactory',function ($scope,$sce,$stateParams,$ionicLoading,HttpFactory) {
    $scope.show = function () {
        $ionicLoading.show({
            template:'Loading...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.show();
    $scope.newsDetail = {
        detail:'',
        body:''
    };

    var docid = $stateParams.data;
    // console.log(docid);
    $scope.mlt = true;
    var url = 'http://localhost:3000/?myUrl=http://c.m.163.com/nc/article/' + docid +'/full.html';
    HttpFactory.getData(url).then(function (result) {
        $scope.hide();
        if (!result){
            $scope.mlt = false;
        }else{
            $scope.mlt = true;
            $scope.newsDetail.detail = result[docid];
            // console.log(result);
            var newsObj = $scope.newsDetail.detail;
            // console.log(newsObj);
            if (newsObj.img && newsObj.img.length){
                for(var i = 0;i < newsObj.img.length;i++){
                    var imgWidth = newsObj.img[i].pixel.split('*')[0];
                    if(imgWidth > document.body.offsetWidth){
                        imgWidth = document.body.offsetWidth;
                    }
                    var imgStyle = 'width:' + imgWidth + "px";
                    var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + '>';
                    newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
                }
            }
        }
    });
}]);
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
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                // url = "http://59.110.139.104:3000/wy?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    promise.resolve(reslut.data);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('myApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" auto-play="true" slide-interval="2000" show-pager="true" does-continue="true" ng-if="isShowSlideBox" on-drag="drag($event)"> <ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide> </ion-slide-box><div class="slideBottomDiv"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate',function ($scope,$element,$ionicSlideBoxDelegate) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;

            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    /*
                     * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                     * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                     * */
                    $scope.isShowSlideBox = true;
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                lastSpan.innerText = $scope.sourceArray[index].title;
            };
            //页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);