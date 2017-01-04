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