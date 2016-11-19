import request from 'request';
import Promise from 'bluebird';

/**
 * Service to make API requests.
 * @param  {Object} options - request options.
 * @param  {Function} callback - callback function for response.
 * @param  {Object} [res] - Express response object. If defined httpClient will attempt to catch
 * @return {Promise} request wrapped promise.
 */
function httpClient (options, callback, res) {

    // Set default request options.
    var _options = {
        baseUrl: options.baseUrl,
        uri: options.url || '',
        method: options.method || 'GET',
        qs: options.params
    };

    // Make http request.
    let query = new Promise((resolve, reject) => {
        request(_options, (error, response, body) => {
            console.log(body);
            if (callback) {
                callback(error, response, response.body);
            }

            let err = error;
            if (!err && response && response.statusCode >= 400) {
                err = new Error();
                err.error = response.error || body.error;
                err.status = response.statusCode || body.statusCode;
                err.message = body.message || response.statusMessage;
            }

            if (err) {
                return reject(err);
            } else {
                resolve(response.body);
            }
        });
    });

    return query;
}

export default httpClient;
