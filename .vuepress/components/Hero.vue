<template>
    <header class="header">
        <div class="circle">
            <img class="circle__title" src="../images/schriftzug.png" alt="Teresa & Manuel">
            <img class="circle__decoration circle__decoration--top" src="../images/emblem-blumen-oben.png">
            <img class="circle__decoration circle__decoration--bottom" src="../images/emblem-blumen-unten.png">
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .header {
        position: relative;
        background: url(../images/header-tileable.jpg) center;
        background-size: auto 100%;
        min-height: 15rem;

        @media (min-width: 30rem) {
            min-height: 20rem;
        }

        @media (min-width: 45rem) {
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            padding: 3rem 9rem;
            background-position: center 30%;
            background-size: auto 135%;
        }
    }

    .circle {
        display: none;

        @media (min-width: 60rem) {
            position: relative;
            display: block;

            --circle-size: 16rem;
            width: var(--circle-size);
            height: var(--circle-size);
        }

        @media (min-width: 70rem) {
            --circle-size: 20rem;
        }

        @media (min-width: 80rem) {
            --circle-size: 24rem;
        }
    }

    .circle__title {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .circle__decoration {
        position: absolute;
        width: 50%;

        &--top {
            top: 0;
            left: 0;
            transform: translate(0, -35%);
        }

        &--bottom {
            bottom: 0;
            right: 0;
            transform: translate(0, 35%);
        }
    }
</style>
