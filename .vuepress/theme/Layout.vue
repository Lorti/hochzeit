<template>
    <Content class="content" :custom="false"/>
</template>

<style lang="scss">
    $main-color: #7a0727;

    html {
        font-family: 'Lato', sans-serif;
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
            background: lighten($main-color, 5%);
            cursor: pointer;
        }
    }

    .header-anchor {
        display: none;
    }
</style>
