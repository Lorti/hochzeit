<template>
    <header class="header">
        <div class="circle">
            <img class="circle__title" src="../images/schriftzug.png" alt="Teresa & Manuel">
            <img class="circle__decoration circle__decoration--top" src="../images/emblem-blumen-oben.png">
            <img class="circle__decoration circle__decoration--bottom" src="../images/emblem-blumen-unten.png">
        </div>
        <img class="header__glue" src="../images/blumen-2.png">
    </header>
</template>

<style lang="scss" scoped>
    .header {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 3rem;
        background: url(../images/header-tileable.jpg) center 30%;
        background-size: auto 135%;

        --circle-size: 24rem;
    }
    .header__glue {
        position: absolute;
        bottom: calc(var(--circle-size) * -0.175);
        left: 0;
        width: calc(var(--circle-size) / 2);
    }
    .circle {
        position: relative;
        width: var(--circle-size);
        height: var(--circle-size);
        max-width: none;
        max-height: none;
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
