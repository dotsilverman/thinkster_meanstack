// cuz ui.router is an external module, need to include it as a dependency in app
var app = angular.module('flapperNews', ['ui.router']);

// CONFIG
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })

        .state('posts', {
            url: 'posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        })

    $urlRouterProvider.otherwise('home');
}]);
/*
CONFIG NOTES:
use config() to setup a "home" state and use the ui-router to setup a home route
*/

// SERVICE/FACTORY
app.factory('posts', [function() {
    var o = {
        posts: []
    };
    return o;
}]);

/*
SERVICE/FACTORY NOTES:
store data in a service called a "factory: outside of the main controller
available to all parts of our site
*/

// CONTROLLER
app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
    $scope.test = 'Hello world!'

    // bind $scope.posts variable in controller to posts array in our service
    $scope.posts = posts.posts;

    $scope.addPost = function () {
        if (!$scope.title ) {return;}
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments : [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
        });
        $scope.title='';
        $scope.link='';
    };

    $scope.incrementUpvotes = function (post) {
        post.upvotes +=1;
    };

}]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        // the following line can be confusing so:
        //  posts = the scope post
        //  .posts = the array posts
        //  $stateParam.id is getting the position of a post in the index using the current url
        //  defineded in $stateParam 
        $scope.post = posts.posts[$stateParam.id];
    }]);

/*
CONTROLLER NOTES:
inject 'posts' into controller
think $stateParams is necessary for getting the {id} in the url route
*/
