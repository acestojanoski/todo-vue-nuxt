<template>
    <div>
        <nav>
            <nuxt-link class="menu-link" to="/">Home</nuxt-link>
            <nuxt-link class="menu-link" to="/about">About</nuxt-link>
        </nav>
        
        <Nuxt class="todo-content" />
    </div>
</template>

<style lang="scss">
    nav {
        margin-top: 5%;
        text-align: center;
        font-family: 'Courier New', Courier, monospace;
    }

    .menu-link {
        text-align: center;
        background-color: #707070;
        color: #ffffff;
        padding: 20px;
        width: auto;
        text-decoration: none;
    }

    .todo-content {
        margin-top: 5%;
    }

    .toastr {
        max-width: 300px;
        padding: 5px;
        opacity: 0.95;
    }
</style>
