<template>
    <div class="todos">
        <v-flex xs12 sm6 md3 style="margin: 0 auto">
          <v-text-field
            label="Insert todo..."
            :value="newTodo"
            v-on:keyup="todoChanged($event)"
          ></v-text-field>
        </v-flex>

        <v-btn v-on:click="insertTodo()" color="blue" style="color: white">Insert</v-btn>

        <v-progress-circular
            indeterminate
            color="blue"
            v-if="todos.isLoading"
            style="display: block; margin: 0 auto"
        />

        <ul>
            <li
                class="todo"
                v-bind:key="todo._id"
                v-for="todo in todos.data"
            >
                {{ todo.description }}
                <span class="delete-todo" v-on:click="deleteTodo(todo._id)">Delete</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    
    export default {
        computed: {
            ...mapState('apiCalls', [
                'todos',
            ]),
            ...mapState([
                'newTodo',
            ])
        },
        methods: {
            ...mapActions('apiCalls', [
                'apiCall',
            ]),
            ...mapActions([
                'setNewTodo'
            ]),
            todoChanged (event) {
                this.setNewTodo(event.target.value);
            },
            insertTodo () {
                this.apiCall({
                    stateKey: 'insertTodo',
                    payload: {
                        description: this.newTodo,
                    }
                })
                    .then((response) => {
                        this.$toast.success(`'${response.data.description}'` + ' is inserted');
                        this.apiCall({ stateKey: 'todos' });
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.error);
                    });
                this.setNewTodo('');
            },
            deleteTodo (id) {
                this.apiCall({
                    stateKey: 'deleteTodo',
                    queryParameter: id,
                })
                    .then(response => {
                        this.$toast.success('Todo removed successfully.')
                        this.apiCall({ stateKey: 'todos' });
                    })
                    .catch(error => {
                        this.$toast.error('Failed to remove todo.')
                    })
            }
        },
        created () {
            this.apiCall({ stateKey: 'todos' })
                .then((response) => {
                    this.$toast.success('Todos loaded successfully.');
                })
                .catch((error) => {
                    this.$toast.error('Error loading todos.');
                });
        },
    }
</script>

<style lang="scss" src="../styles/home.scss" scoped>
</style>
