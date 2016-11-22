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

        /**
         * Opens a Single Image View
         */
        openImage (image) {
            console.log(image.title);
            this.singleImage = { 
                display: 'block'
            };
            this.allImages = {
                position: 'fixed'
            };
            this.mainImage = image;
        }

        closeImage () {
            this.singleImage = {
                display: 'none'
            };
            this.allImages = {
                position: 'initial'
            };
            this.mainImage = null;
        }
    }

});
})();