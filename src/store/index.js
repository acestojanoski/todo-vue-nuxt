export const state = () => ({
    newTodo: '',
});

export const mutations = {
    SET_NEW_TODO (state, newTodo) {
        state.newTodo = newTodo;
    },
};

export const actions = {
    setNewTodo ({ commit }, newTodo) {
        commit('SET_NEW_TODO', newTodo);
    }
}
