<template>
    <Content class="content" :custom="false"/>
</template>

<style lang="scss">
    @import "./config";

    * {
        box-sizing: border-box;
    }

    html {
        font-family: 'Lato', sans-serif;
        cursor: default;
    }

    body {
        margin: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Abril Fatface', cursive;
    }

    a {
        color: $main-color;
        text-decoration: none;

        &:hover {
            color: $hover-color;
            text-decoration: underline;
        }
    }

    .header-anchor {
        display: none;
    }

    ::selection {
        color: #fff;
        background: $main-color;
    }

    @media (min-width: 1280px) {
        html {
            font-size: 112.5%;
        }
    }
</style>
