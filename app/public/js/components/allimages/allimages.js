(function(){
  'use strict';
  var app = angular.module('app');

  app.component('allImages', {
    // Load the template
    templateUrl: '/js/components/allimages/allimages.html',
    controllerAs: 'ctrl',
    bindings: {
      searchText: '<'
    },
    controller: class AllImagesComponent {
        constructor ($scope, $http) {
        console.log('data');
        const options = {
            url: '/getImages',
            method: 'GET',
            params: {
                format: 'json',
                nojsoncallback: 1
            }
        };

        $http(options)
            .then((res) => {
                this.imageJSON = res.data;
            })
            .catch((err) => {
                console.log('Error in loading images:', err.data);
            });
        }

        get getText () {
            return this.searchText;
        }
    }
});
})();
