(function(){
  'use strict';
  var app = angular.module('app');

  app.component('allImages', {
    // Load the template
    templateUrl: '/js/components/allimages/allimages.html',
    controllerAs: 'ctrl',
    bindings: {
      searchText: '='
    },
    controller: class AllImagesComponent {
        constructor ($scope, $http) {
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

        // Getter Method
        get getText () {
            return this.searchText;
        }

        // TODO: This needs to be completed for AOS css
        filterMethod () {
            if (this.searchText === '')
                return this.imageJSON.photos.photo;
            return
        }
    }

});
})();