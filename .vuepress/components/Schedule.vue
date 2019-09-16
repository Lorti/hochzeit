<template>
    <ul class="schedule">
        <li class="schedule__item">
            <span class="schedule__text">Trauung</span>
            <span class="schedule__horizontal-line"></span>
            <img class="schedule__image" src="../images/rings.svg">
        </li>
        <li class="schedule__item">
            <span class="schedule__text">Agape</span>
            <span class="schedule__horizontal-line"></span>
            <img class="schedule__image" src="../images/champagne-glass.svg">
        </li>
        <li class="schedule__item">
            <span class="schedule__text">Essen!</span>
            <span class="schedule__horizontal-line"></span>
            <img class="schedule__image" src="../images/fork.svg">
        </li>
        <li class="schedule__item">
            <span class="schedule__text">Party!</span>
            <span class="schedule__horizontal-line"></span>
            <img class="schedule__image" src="../images/disco-ball.svg">
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    .schedule {
        position: relative;
        padding-left: 0;
        list-style: none;

        &::after {
            position: absolute;
            top: 1.5rem;
            left: 50%;
            width: 1px;
            height: 3 * (3rem + 1rem);
            background: black;
            content: '';
        }
    }

    .schedule__item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;

        &:nth-child(even) {
            flex-direction: row-reverse;
        }
    }

    .schedule__image {
        width: auto;
        height: 3rem;
    }

    .schedule__text {
    }

    .schedule__image,
    .schedule__text {
        width: 4rem;
    }

    .schedule__horizontal-line {
        border: none;
        margin: 0 .5rem;
        width: 2rem;
        height: 1px;
        background: black;
    }
</style>
