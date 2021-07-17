<template>
    <form autocomplete="off" v-cloak>
        <transition name="fade" mode="out-in">
            <section class="wrap wrap--s" v-if="!group" key="entry">
                <h1 class="headline headline--small">Willkommen auf unserer Hochzeits-Website!</h1>
                <p>Auf unserer Einladung steht ein Code, den du im unten stehenden Feld eingeben kannst, um dich anzumelden.</p>
                <input
                    class="code"
                    type="text"
                    :value="password.toUpperCase()"
                    @input="password = $event.target.value.toUpperCase()"
                    autofocus
                >
                <p>
                    <button
                        @click.prevent="login"
                        :disabled="isLoading"
                    >
                        Anmelden
                    </button>
                </p>
            </section>

            <section v-else key="content">
                <div class="wrap wrap--l">
                    <h1>Hallo {{ group.name }}!</h1>
                    <p>
                        Wir heiraten, und das wollen wir mit euch feiern!<br>
                        Unsere Hochzeit findet am <strong>Donnerstag, 29. Juli 2021</strong> beim Oberhauser statt.
                    </p>
                    <p>Hier findet ihr alle nötigen Infos. Bei weiteren Fragen, könnt ihr euch gerne an uns wenden!</p>
                    <p>Wir freuen uns auf euch!</p>
                </div>

                <img class="leaf" src="../images/zweig.png">

                <div>
                    <p class="wrap wrap--l" v-if="group.guests.length > 1">
                        Bitte gebt uns Bescheid, ob ihr zu unserer Hochzeit kommen könnt.
                    </p>
                    <p class="wrap" v-else>
                        Bitte gib uns Bescheid, ob du zu unserer Hochzeit kommen kannst.
                    </p>

                    <div :class="['guests', { 'guests--flex': group.guests.length > 1 }]">
                        <div class="guests__guest" v-for="guest in group.guests">
                            <template v-if="guest.custom">
                                <h2>Begleitung</h2>
                                <label>
                                    <span>Name der Begleitung</span>
                                    <input type="email" v-model="guest.name">
                                </label>
                            </template>
                            <template v-else>
                                <h2>{{ guest.name }}</h2>
                            </template>
                            <label class="checkbox">
                                <input class="checkbox__input" type="checkbox" v-model="guest.attending">
                                <span class="checkbox__icon checkbox__icon--checkmark"></span>
                                <span class="checkbox__label">
                                    Ja, ich komme gerne.
                                </span>
                            </label>
                            <label class="checkbox">
                                <input class="checkbox__input" type="checkbox" v-model="guest.vegetarian">
                                <span class="checkbox__icon checkbox__icon--checkmark"></span>
                                <span class="checkbox__label">
                                    Ich möchte eine vegetarische Hauptspeise.<br>
                                    <small>(restliche Gänge sind ohnehin vegetarisch)</small>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class="wrap">
                        <label class="checkbox" v-if="showPlusOneButton">
                            <input class="checkbox__input" type="checkbox" @change="addPlusOneGuest">
                            <span class="checkbox__icon checkbox__icon--plus">+</span>
                            <span class="checkbox__label">
                                Ich möchte eine Begleitung mitnehmen.
                            </span>
                        </label>

                        <div class="group">
                            <label class="checkbox">
                                <input class="checkbox__input" type="checkbox" v-model="group.shuttle">
                                <span class="checkbox__icon checkbox__icon--checkmark"></span>
                                <span class="checkbox__label">
                                    <template v-if="group.guests.length > 1">Wir möchten beim Shuttle mitfahren.</template>
                                    <template v-else>Ich möchte beim Shuttle mitfahren.</template>
                                </span>
                            </label>
                            <label>
                                <span v-if="group.guests.length > 1">Eure E-Mail-Adresse (für Fotos und Updates)</span>
                                <span v-else>Deine E-Mail-Adresse (für Fotos und Updates)</span>
                                <input type="email" v-model="group.email" autocomplete="email" autocapitalize="none">
                            </label>
                            <label>
                                <span v-if="group.guests.length > 1">Möchtet ihr uns noch etwas mitteilen?</span>
                                <span v-else>Möchtest du uns noch etwas mitteilen?</span>
                                <textarea v-model="group.message" rows="5" cols="20"></textarea>
                            </label>
                        </div>

                        <input type="hidden" v-model="password">
                        <input type="hidden" v-model="group.id">

                        <button
                            @click.prevent="update"
                            :disabled="isLoading"
                        >
                            Änderungen speichern
                        </button>
                    </div>
                </div>

                <img class="leaf" src="../images/zweig.png">

                <div>
                    <div class="wrap">
                        <h2 id="Ablauf">Ablauf</h2>
                        <p>Unser gesamtes Fest findet am <strong>Oberhauser</strong>-Hof statt.</p>
                        <p>Um <strong>15:00 Uhr</strong> beginnt unsere Trauung.</p>
                        <Schedule/>
                    </div>
                    <div class="photographs">
                        <div class="photographs__image">
                            <img src="../images/image.jpg">
                        </div>
                        <div class="photographs__text">
                            <p>Wir bitten euch während der Zeremonie <strong>NICHT</strong> zu fotografieren!</p>
                            <p>
                                Wir haben eine wunderbare Fotografin, die den Tag für uns festhält.<br>
                                Keine Sorge, ihr bekommt nach der Hochzeit <strong>alle Fotos per E-Mail</strong> zugeschickt.
                            </p>
                        </div>
                    </div>
                </div>

                <img class="leaf" src="../images/zweig.png">

                <div>
                    <h2 id="Anreise">Anreise</h2>
                    <div class="location">
                        <div class="location__flowers">
                            <img src="../images/blumen-1.png">
                        </div>
                        <p class="location__address">
                            Der Oberhauser<br>
                            Kranzing 14<br>
                            4615 Holzhausen
                        </p>
                        <iframe class="location__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.865460112851!2d14.088598615652886!3d48.24771727923232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477392069fe507a1%3A0x6734220a0c9bc331!2sDer%20Oberhauser%20Barbara%20Zehetner!5e0!3m2!1sde!2sat!4v1568143650824!5m2!1sde!2sat" width="640" height="480"></iframe>
                    </div>
                    <div class="wrap">
                        <p>
                            Damit ihr mit uns die Nacht durchfeiern könnt und keiner Taxi spielen muss,
                            organisieren wir für euch einen <strong>Shuttledienst</strong>.
                        </p>
                        <p>
                            Dieser bringt euch am Nachmittag rechtzeitig zur Trauung
                            und in der Nacht wieder zurück nach Linz.
                        </p>
                        <h3>Hinfahrt</h3>
                        <p>
                          Der Shuttle fährt um <strong>13:50 Uhr</strong> vom <strong>Domplatz</strong> ab,
                          damit ihr rechtzeitig um <strong>14:30 Uhr</strong> beim Oberhauser seid.
                        </p>
                        <h3>Rückfahrt</h3>
                        <p>
                          Der Shuttle fährt um
                          <strong>00:30 Uhr</strong>,
                          <strong>01:30 Uhr</strong> und
                          <strong>02:30 Uhr</strong>
                          zurück zum <strong>Domplatz</strong>.
                        </p>
                        <p>
                          Bitte gebt am Abend <strong>Daniel Timelthaler</strong>
                          (<a :href="`tel:${daniTel}`">{{ daniTel }}</a>)
                          Bescheid mit welchem Shuttle ihr zurückfahren wollt.
                          Die Vans starten erst, wenn mindestens 5 Fahrgäste mitfahren.
                        </p>
                        <p>Bei der Rückfahrt wird vom Taxifahrer ein Unkostenbeitrag von 5 € pro Person kassiert.</p>
                    </div>
                </div>

                <img class="leaf" src="../images/zweig.png">

                <div class="wrap wrap--m">
                    <h2 id="Geschenke-und-Spiele">Geschenke & Spiele</h2>
                    <p>
                        Am meisten würden wir uns über eine finanziellen Beitrag für unsere Feier freuen.
                        Das muss kein Cellophan-Ungetüm oder Geld in einem Betonblock sein – ein nettes Kuvert reicht uns völlig.
                    </p>
                    <p>
                        Für Fragen und Ideen zur Feier und zu Spielen kontaktiert bitte <strong>Julia Fellner</strong> unter
                        <a :href="`tel:${julieTel}`">{{ julieTel }}</a> oder
                        <a :href="`mailto:${julieMail}`">{{ julieMail }}</a>.
                    </p>
                </div>

                <img class="leaf" src="../images/zweig.png">

                <h2 class="Unterkunft">Unterkünfte</h2>
                <div class="wrap wrap--s">
                    <p>Für unsere Gäste, die nicht aus Linz kommen, empfehlen wir folgende Hotels.</p>
                    <p>Wir selbst werden die Nacht im Hotel am Domplatz verbringen.</p>
                </div>
                <div class="wrap">
                    <ul class="hotels">
                        <li class="hotels__hotel">
                            <strong>Hotel am Domplatz</strong><br>
                            Stifterstraße 4<br>
                            <a href="tel:+43 732 773 000">+43 732 773000</a><br>
                            <a href="https://www.hotelamdomplatz.at/">www.hotelamdomplatz.at</a>
                        </li>
                        <li class="hotels__hotel">
                            <strong>Park Inn</strong><br>
                            Hessenplatz 18<br>
                            <a href="tel:+43 732 777 100">+43 732 777 100</a><br>
                            <a href="https://www.radissonhotels.com/de-de/hotels/park-inn-linz">www.radissonhotels.com</a>
                        </li>
                        <li class="hotels__hotel">
                            <strong>Hotel Schillerpark</strong><br>
                            Rainerstraße 2-4<br>
                            <a href="tel:+43 732 69 50 102">+43 732 69 50-102</a><br>
                            <a href="https://www.austria-trend.at/de/hotels/schillerpark">www.austria-trend.at</a>
                        </li>
                        <li class="hotels__hotel">
                            <strong>Ibis Linz City</strong><br>
                            Kärntner Strasse 18-20<br>
                            <a href="tel:+43 732 69401">+43 732 69401</a><br>
                            <a href="https://www.accorhotels.com/de/hotel-1722-ibis-linz-city/index.shtml">www.accorhotels.com</a>
                        </li>
                    </ul>
                </div>

                <div class="footer">
                    <img class="footer__flower" src="../images/blumen-2.png">
                </div>
            </section>
        </transition>
    </form>
</template>

<script>
    import Schedule from './Schedule';

    export default {
        components: {
            Schedule,
        },
        data() {
            return {
                password: '',
                group: null,
                isLoading: false,
            };
        },
        computed: {
            headers() {
                return {
                    Authorization: `Token ${this.password.toUpperCase()}`,
                };
            },
            showPlusOneButton() {
                return this.group.guests_editable && !this.group.guests.find(guest => guest.custom);
            },
            daniTel() {
                return atob('KzQzIDY4MCAyMTQ5NzYy');
            },
            julieTel() {
                return atob('KzQzIDY4MSAyMDU5MjgxMg==');
            },
            julieMail() {
                return atob('anVsaWEuZmVsbG5lckBnbXguYXQ=');
            }
        },
        methods: {
            async login() {
                this.isLoading = true;
                try {
                    const result = await this.$axios.get('/group', { headers: this.headers });
                    this.group = result.data;
                } catch (error) {
                    this.group = null;
                    alert('Sorry, das ist leider der falsche Code!');
                }
                this.isLoading = false;
            },
            async update() {
                this.isLoading = true;
                await this.$axios.post('/group', {
                    ...this.group,
                }, { headers: this.headers });
                this.isLoading = false;
                alert('Danke, deine Änderungen wurden gespeichert!');
            },
            addPlusOneGuest() {
                this.group.guests.push({
                    name: '',
                    attending: true,
                    vegetarian: false,
                    custom: true
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../theme/config";

    @mixin focusStyle() {
        outline: 3px solid $hover-color;
        border-radius: 0;
    }

    section {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    h1 {
        font-size: 1.725rem;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
    }

    .headline {}

    .headline--small {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    a {
        white-space: nowrap;
    }

    .wrap {
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 30rem;

        &--s {
            max-width: 20rem;
        }

        &--m {
            max-width: 40rem;
        }

        &--l {
            max-width: 60rem;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    button {
        border: none;
        padding: .5rem 1rem;
        font-size: inherit;
        color: #fff;
        background: $main-color;
        border-radius: 3px;
        transition: all .25s;

        &:hover {
            background: $hover-color;
            cursor: pointer;
        }

        &:disabled {
            opacity: .5;
        }
    }

    label {
        display: block;
        margin-top: 1rem;
        margin-bottom: 1rem;
        text-align: left;

        span {
            display: block;
        }
    }

    [type="text"],
    [type="email"],
    textarea {
        width: 100%;
        padding: 0.5rem;
        font-size: inherit;
        font-family: inherit;
        border: 1px solid $main-color;
        border-radius: 3px;
    }

    button:focus,
    input:focus,
    textarea:focus {
        @include focusStyle;
    }

    span + input,
    span + textarea {
        margin-top: 0.25rem;
    }

    .code {
        display: block;
        margin-bottom: 1rem;
        border: none;
        border-bottom: 2px dotted black;
        border-radius: 0;
        width: 100%;
        font-size: 2rem;
        font-family: monospace;
        text-align: center;

        &:focus {
            outline: none;
            border-color: $main-color;
            color: $main-color;
        }
    }

    .leaf {
        display: block;
        margin: 2.5rem auto;
    }

    .checkbox {
        position: relative;
        margin: 1rem 0;

        &::after {
            content: '';
            clear: both;
        }
    }

    .checkbox__input {
        position: absolute;
        opacity: 0;
    }

    .checkbox__icon {
        float: left;
        width: 1.2em;
        height: 1.2em;
        color: #fff;
        background: $main-color;
        border-radius: 3px;
        text-align: center;
        line-height: 1.2;

        &--checkmark::after {
            position: absolute;
            left: 0;
            margin: 0.25em;
            height: 0.25em;
            width: 0.5em;
            border-left: 3px solid #fff;
            border-bottom: 3px solid #fff;
            transform: rotate(-45deg);
        }
    }

    .checkbox__input:checked ~ .checkbox__icon::after {
        content: '';
    }

    .checkbox__input:focus ~ .checkbox__icon {
        @include focusStyle;
    }

    .checkbox__label {
        margin-left: 1.2em + 0.5em;
        text-align: left;
    }

    .guests {
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 30rem;
        text-align: left;

        &--flex {
            display: flex;
            flex-wrap: wrap;
            max-width: 45rem;
        }
    }

    .guests__guest {
        flex: 1 0 14rem;
    }

    .group {
        margin-top: 2rem;
    }

    .photographs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 2.5rem auto;
    }

    .photographs__image {
        max-width: 30rem;
    }

    .photographs__text {
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 45rem;

        @media (min-width: 60rem) {
            padding-left: 4rem;
            padding-right: 4rem;
        }
    }

    .location {
        margin-left: auto;
        margin-right: auto;
        max-width: 75rem;

        @media (min-width: 50rem) {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 2rem;
        }
    }

    .location__flowers {
        display: none;
        width: 25%;
        transform: scale(1.25) translateX(-10%);

        @media (min-width: 50rem) {
            display: block;
        }
    }

    .location__address {
        width: 100%;

        @media (min-width: 50rem) {
            width: 25%;
            font-size: 1.25rem;
            font-weight: lighter;
        }
    }

    .location__map {
        border: 0;
        width: 100%;
        height: 21rem;

        @media (min-width: 50rem) {
            width: 50%;
        }
    }

    .hotels {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        list-style: none;
    }

    .hotels__hotel {
        flex: 1 0 14rem;
        margin-bottom: 1rem;
    }

    .footer {
        overflow: hidden;
        margin: 2rem auto;
        padding-left: 2rem;
        padding-right: 2rem;
        max-width: 24rem;
    }
</style>
