<template>
    <b-container>
        <b-row>
            <b-col cols="11">
                <b-form-input
                    placeholder="Insert todo..."
                    :value="newTodo"
                    v-on:keyup="todoChanged($event)"
                ></b-form-input>
            </b-col>
            <b-col cols="1">
                <b-button
                    variant="primary"
                    v-on:click="insertTodo()"
                >
                    Insert
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col style="margin: 20px 0; text-align: center;">
                <b-spinner
                    variant="primary"
                    type="grow"
                    label="Spinning"
                    v-if="todos.isLoading"
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-list-group>
                    <b-list-group-item
                        style="cursor: grab"
                        href="#"
                        variant="default"
                        :key="todo._id"
                        v-for="todo in todos.data"
                    >
                        {{ todo.description }}
                        <span class="delete-todo" v-on:click="deleteTodo(todo._id)">Delete</span>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
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
            presentToast (variant, title, message) {
                this.$bvToast.toast(message, {
                    title,
                    variant,
                    solid: true
                })
            },
            insertTodo () {
                this.apiCall({
                    stateKey: 'insertTodo',
                    payload: {
                        description: this.newTodo,
                    }
                })
                    .then((response) => {
                        this.presentToast('success', 'Success', `'${response.data.description}' is inserted`);
                        this.apiCall({ stateKey: 'todos' });
                    })
                    .catch((error) => {
                        this.presentToast('danger', 'Error', error.response.data.error)
                    });
                this.setNewTodo('');
            },
            deleteTodo (id) {
                this.apiCall({
                    stateKey: 'deleteTodo',
                    queryParameter: id,
                })
                    .then(response => {
                        this.presentToast('success', 'Success', 'Todo removed successfully.')
                        this.apiCall({ stateKey: 'todos' });
                    })
                    .catch(error => {
                        this.presentToast('danger', 'Error', 'Failed to remove todo.')
                    })
            }
        },
        created () {
            this.apiCall({ stateKey: 'todos' })
                .then((response) => {
                    this.presentToast('success', 'Success', 'Todos loaded successfully.');
                })
                .catch((error) => {
                    this.presentToast('danger', 'Error', 'Error loading todos.');
                });
        },
    }
</script>

<style lang="scss" src="../styles/home.scss" scoped>
</style>
