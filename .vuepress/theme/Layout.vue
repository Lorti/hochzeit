<template>
    <Content class="content" :custom="false"/>
</template>

<style lang="scss">
    @import "./config";

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

    button {
        border: none;
        padding: .5rem 1rem;
        font-size: inherit;
        color: #fff;
        background: $main-color;
        border-radius: 3px;
        transition: background .25s;

        &:hover {
            background: $hover-color;
            cursor: pointer;
        }

        &:disabled {
            opacity: .5;
        }
    }

    .header-anchor {
        display: none;
    }

    ::selection {
        color: #fff;
        background: $main-color;
    }
</style>
