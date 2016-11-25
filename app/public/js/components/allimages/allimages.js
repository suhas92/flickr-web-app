(function(){
  'use strict';
  var app = angular.module('app');
  let _http = new WeakMap();
  let options = new WeakMap();

  app.component('allImages', {
    // Loads the template
    templateUrl: '/js/components/allimages/allimages.html',
    controllerAs: 'ctrl',
    bindings: {
      searchText: '<',
      onChange: '&'
    },
    controller: class AllImagesComponent {
        constructor ($http) {
            _http = $http;
            this.perPage = '10';
            this.page = '1';
            this.sort = 'relevance';

            this.$onChanges = function (changesObj) {
                console.log(changesObj)
                this.pending = true;
                this.page = 1;
                if (changesObj.searchText.currentValue) {
                    this.searchText = changesObj.searchText.currentValue;
                    this.searchImage();
                } else {
                    this.getAll();
                }
            };

        }

        /**
         * Get all Images
         */
        getAll () {
            this.imageJSON = [];
            this.pending = true;
            options = {
                url: '/getImages',
                method: 'GET',
                params: {
                    format: 'json',
                    nojsoncallback: 1,
                    per_page: this.perPage,
                    page: this.page,
                    extras: `description,date_upload,owner_name`
                }
            };
            _http(options)
                .then((res) => {
                    this.pending = false;
                    this.imageJSON = res.data;
                    this.totalImages = this.imageJSON.photos.total;
                    this.page = this.imageJSON.photos.page;
                    this.totalPages = this.imageJSON.photos.pages;
                })
                .catch((err) => {
                    console.log('Error in loading images:', err.data);
                });
        }

        /**
         * Search Images with a search text
         */
        searchImage () {
            this.imageJSON = [];
            this.pending = true;
            let searchOptions = {
                url: `/getImages/searchText`,
                method: 'GET',
                params: {
                    format: 'json',
                    nojsoncallback: 1,
                    per_page: this.perPage,
                    page: this.page,
                    sort: this.sort,
                    extras: `description,date_upload,owner_name`,
                    text: encodeURIComponent(this.searchText)
                }
            }
            // This is for a specific case when the search text is '' and sort is defined
            if (searchOptions.params.text === 'undefined') {
                delete searchOptions.params.text;
            }    
            console.log(searchOptions);
            return _http(searchOptions)
                .then((res) => {
                    this.imageJSON = res.data;
                    this.pending = false;
                    this.totalImages = this.imageJSON.photos.total;
                    this.page = this.imageJSON.photos.page;
                    this.totalPages = this.imageJSON.photos.pages;

                })

        }

        /**
         * Opens the Single Image View
         */
        openImage (image) {
            this.mainImage = image;
            this.bounceOutDown = null;
            this.bounceInUp = true
            this.getImageSizes();
            this.singleImage = { 
                display: 'block'
            };
        }

        /**
         * Closes the Single Image View
         */
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

        /**
         * Takes to the next page
         */
        nextPage () {
            this.page++;
            this.changePage();
        }

        /**
         * Takes to the previous page
         */
        prevPage () {
            this.page--;
            this.changePage();
        }

        /**
         * Takes to the first page
         */
        firstPage () {
            this.page = 1;
            this.changePage();
        }

        /**
         * Takes to the last page
         */
        lastPage () {
            this.page = this.totalPages;
            this.changePage();
        }

        /**
         * Changes/Reloads the page with new properties if any
         */
        changePage () {
            this.pending = true;
            this.imageJSON = [];
            console.log(this.searchText);
            this.searchImage();
        }

        /**
         * Returns the different image sizes and their download links
         */
        getImageSizes () {
            let infoOptions = {
                url: '/getImageSizes',
                method: 'GET',
                params: {
                    format: 'json',
                    nojsoncallback: 1,
                    photo_id: this.mainImage.id
                }
            }    
            _http(infoOptions)
                .then((res) => {
                    this.mainImageInfo = res.data;
                })
            
        }
    }   
});
})();