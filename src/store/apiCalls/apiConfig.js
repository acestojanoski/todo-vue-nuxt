const baseUrl = 'http://localhost:5000/api'

export default {
    todos: {
        url: baseUrl + '/todos',
        method: 'GET',
    },
    insertTodo: {
        url: baseUrl + '/todos',
        method: 'POST'
    },
    deleteTodo: {
        url: baseUrl + '/todos',
        method: 'DELETE'
    }
};
