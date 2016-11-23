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
                nojsoncallback: 1,
                per_page: 10,
                extras: 'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o'
            }
        };
        $http(options)
            .then((res) => {
                this.hidden = 'none';
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
            this.mainImage = image;
            this.bounceOutDown = null;
            this.bounceInUp = true
            console.log(image.title);
            this.singleImage = { 
                display: 'block'
            };
            ;
        }

        closeImage () {
            this.bounceInUp = false;

            this.bounceOutDown = true;

            this.singleImage = {
                display: 'none'
            };
            this.allImages = {
                position: 'relative'
            };
            this.mainImage = null;

        }
    }

});
})();