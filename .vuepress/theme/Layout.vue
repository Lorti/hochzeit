<template>
    <div class="theme-container">
        <div class="hero" :style="{ backgroundImage: `url(/graukogel.jpg)` }">
            <h1>Teresa & Manuel<br><small>30.5.20</small></h1>
        </div>
        <Content :custom="false"/>
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

<style src="../../node_modules/vuepress/lib/default-theme/styles/theme.styl" lang="stylus"></style>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Sacramento');

    .hero {
        background-position: 61% center;
        background-size: cover;
        height: 100vh;

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
                transform: translateY(-50%);
            }
        }

        h1 {
            font-size: 3rem;
            line-height: 1;
        }

        small {
            font-size: 2rem;
            line-height: 1;
        }
    }

    .content > *:first-child {
        margin-top: 1rem !important;
        padding-top: 0 !important;
    }
</style>
