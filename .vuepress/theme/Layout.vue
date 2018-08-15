<template>
    <div class="layout" :style="{ backgroundImage: `url(${data.heroImage})` }">
        <h1>{{ data.heroText }}</h1>
    </div>
</template>

<script>
    export default {
        computed: {
            data() {
                return this.$page.frontmatter
            },
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Sacramento');
    html, body, #app, .layout {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
    .layout {
        background-position: 61% center;
        background-size: cover;
    }
    h1 {
        position: absolute;
        top: 5vh;
        margin: 0;
        width: 100%;
        text-align: center;
        font-family: 'Sacramento', cursive;
        font-weight: lighter;
        color: #fff;

        @media (min-width: 1024px) {
            width: auto;
            top: 50vh;
            left: 25vh;
        }
    }
</style>
