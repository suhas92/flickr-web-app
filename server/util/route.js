import httpClient from '../http.js';

let _imageUrl = new WeakMap();
let _infoUrl = new WeakMap();
let _params = new WeakMap();

class Route {
    constructor () {
        _imageUrl = process.env.IMAGE_PATH;
        _infoUrl = process.env.INFO_PATH;
        _params = {
            api_key: process.env.API_KEY,
            user_id: process.env.USER_ID
        }
    }

    /**
     * Get Images.
     * @param  {Object} [req]
     * @param  {Object} [res]
     * @return {Promise}
     */
    getImages (req, res) {
        const httpOptions = {
            baseUrl: _imageUrl,
            method: 'GET',
            params: Object.assign(req.query, _params)
        };

        return httpClient(httpOptions, null, res)
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send('Something broke!', err));
    }

    /**
     * Get Image Info.
     * @param  {Object} [req]
     * @param  {Object} [res]
     * @return {Promise}

     */
    getImageSizes (req, res) {
        const httpOptions = {
            baseUrl: _infoUrl,
            method: 'GET',
            params: Object.assign(req.query, _params)
        };

        return httpClient(httpOptions, null, res)
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send('Something broke!', err));
    }
}

export default new Route();
