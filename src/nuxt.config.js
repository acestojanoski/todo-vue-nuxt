module.exports = {
    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/toast',
        'bootstrap-vue/nuxt'
    ],

    toast: {
        position: 'top-right',
        duration: 2000,
        keepOnHover: true,
        containerClass: 'toastr',
    },
};
