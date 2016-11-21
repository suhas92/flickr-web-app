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

        getText () {
            return this.searchText;
            // return (item) => {
            //     if (this.searchText === undefined) {
            //         return true;
            //     }
            //     console.log('>><<', item.title.toLowerCase().includes(this.searchText));
            //     return item.title.toLowerCase().includes(this.searchText);
            // }
        }

        

        // get filterImages () {
        //     if (this.searchText === '')
        //         return;
        //     console.log(this.searchText);
        //     return function (item) {
        //         return item.title.includes(this.searchText);
        //     }
        // }
    }

});

app.filter('highlightWord', function() {
    return function(text, selectedWord) {
      if(selectedWord) {
        var pattern = new RegExp(selectedWord, "g");
        return text.replace(pattern, '<span class="highlighted">' + selectedWord + '</span>');
      }
      else {
        return text;
      }
    };
});
})();
