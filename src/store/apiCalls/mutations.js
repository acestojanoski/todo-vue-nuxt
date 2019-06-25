export default {
    API_CALL_STARTED (state, stateKey) {
        state[stateKey] = {
            isLoading: true,
            isLoaded: false,
            isError: false,
        };
    },
    API_CALL_FINISHED (state, { stateKey, response }) {
        state[stateKey] = {
            isLoading: false,
            isLoaded: true,
            isError: false,
            ...response,
        }
    },
    API_CALL_ERROR (state, { stateKey, error }) {
        state[stateKey] = {
            isLoading: false,
            isLoaded: false,
            isError: true,
            ...error,            
        }
    }
};