(function(){
  'use strict';
  var app = angular.module('app');

  app.component('navBar', {
    // Load the template
    bindings: {
      searchText: '<',
      onSearchChange: '&'
    },
    scope: {},
    templateUrl: '/js/components/navbar/navbar.html',
    controller: class NavBarComponent {
        constructor () {
            this.searchChange = (searchText) => {
                this.searchText = searchText;
                this.onSearchChange({$event: {search: searchText}});
            }
        }
    }
  });
})();
