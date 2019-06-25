import apiConfig from './apiConfig';
import axios from './axios';

export default {
    apiCall({ commit }, { stateKey, payload = {}, queryParameter = '', queryString = '' }) {
        const method = apiConfig[stateKey].method;
        const url = apiConfig[stateKey].url;

        if (
            !apiConfig[stateKey] ||
            typeof apiConfig[stateKey] === 'undefined'
        ) {
            commit(
                'API_CALL_ERROR',
                stateKey,
                {
                    error: 'Api config error. (state key not found).'
                }
            );
        }

        if (!method || typeof method === 'undefined') {
            commit(
                'API_CALL_ERROR',
                stateKey,
                {
                    error: 'Api config error (method not found).'
                }
            );
        }

        if (!url || typeof url === 'undefined') {
            commit(
                'API_CALL_ERROR',
                stateKey,
                {
                    error: 'Api config error (url not found).'
                }
            );
        }

        commit('API_CALL_STARTED', stateKey);

        return new Promise((resolve, reject) => {
            axios({
                url: `${url}/${queryParameter}?${queryString}`,
                method,
                data: payload,
            })
                .then(response => {
                    commit('API_CALL_FINISHED', { stateKey, response });
                    resolve(response);
                })
                .catch(error => {
                    commit('API_CALL_ERROR', { stateKey, error });
                    reject(error);
                });
        });
    }
};
