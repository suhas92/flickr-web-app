(function() {
    var app =  angular.module('app', ['angularMoment']);
    // A controller that displays hello world
    app
    .controller('HomeCtrl', function($scope) {
        $scope.searchChange = function(searchText) {
            console.log('Main', searchText);
    };

    })
;
})();
