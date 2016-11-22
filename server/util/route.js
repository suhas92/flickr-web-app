import httpClient from '../http.js';

let _baseUrl = new WeakMap();
let _params = new WeakMap();

class Route {
    constructor () {
        _baseUrl = process.env.API_PATH;

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
            baseUrl: _baseUrl,
            method: 'GET',
            params: Object.assign(req.query, _params)
        };

        return httpClient(httpOptions, null, res)
            .then((data) => res.send(data))
            .catch((err) => reject(err));
    }
}

export default new Route();
