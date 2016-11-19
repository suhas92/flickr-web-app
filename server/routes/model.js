import Route from '../util/route.js';

function model(app) {

  'use strict';

  app.route('/getImages').get(Route.getImages);

}

export default model;
