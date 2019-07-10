<template>
    <div>
        <div class="hero" :style="{ backgroundImage: `url(/graukogel.jpg)` }">
            <h1>Teresa & Manuel<br><small>30.5.20</small></h1>
        </div>
        <Content class="content" :custom="false"/>
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

<style src="../../node_modules/@vuepress/theme-default/styles/index.styl" lang="stylus"></style>

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

    .content {
        display: block;
        margin: 0 auto;
        padding: 2rem;
        max-width: 48rem;
    }
</style>
