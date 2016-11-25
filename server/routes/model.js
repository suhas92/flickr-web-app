import Route from '../util/route.js';

function model(app) {

  'use strict';

  app.route('/getImages').get(Route.getImages);
  app.route('/getImages/searchText').get(Route.searchImages);
  app.route('/getImageSizes').get(Route.getImageSizes);

}

export default model;
