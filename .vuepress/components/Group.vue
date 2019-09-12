<template>
    <form autocomplete="off">
        <section class="wrap wrap--entry" v-if="!group">
            <h1>Willkommen auf unserer Hochzeits-Website!</h1>
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

        <section v-else>
            <div class="wrap">
                <h1>Hallo {{ group.name }}!</h1>
                <p>
                    Wir heiraten, und das wollen wir mit euch feiern!<br>
                    Unsere Hochzeit findet am 30. Mai 2020 beim Oberhauser statt.
                </p>
                <p>Hier findet ihr alle nötigen Infos. Bei weiteren Fragen, könnt ihr euch gerne an uns wenden!</p>
                <p>Wir freuen uns auf euch!</p>
            </div>

            <img class="leaf" src="../images/zweig.png">

            <div class="wrap">
                <p>Bitte gebt uns bis 1. Februar Bescheid, ob ihr zu unserer Hochzeit kommen könnt.</p>

                <div v-for="guest in group.guests">
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
                            Ja, ich komme gerne zu eurer Hochzeit
                        </span>
                    </label>
                    <label class="checkbox">
                        <input class="checkbox__input" type="checkbox" v-model="guest.vegetarian">
                        <span class="checkbox__icon checkbox__icon--checkmark"></span>
                        <span class="checkbox__label">
                            Ich möchte eine vegetarische Hauptspeise<br>
                            <small>(restliche Gänge sind ohnehin vegetarisch)</small>
                        </span>
                    </label>
                </div>

                <label class="checkbox" v-if="showPlusOneButton">
                    <input class="checkbox__input" type="checkbox" @change="addPlusOneGuest">
                    <span class="checkbox__icon checkbox__icon--plus">+</span>
                    <span class="checkbox__label">
                        Ich möchte eine Begleitung mitnehmen
                    </span>
                </label>

                <div>
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

            <img class="leaf" src="../images/zweig.png">

            <div>
                <div class="wrap">
                    <h2>Ablauf</h2>
                    <p>Unser gesamtes Fest findet am Oberhauser-Hof statt.</p>
                    <p>Um 15:00 Uhr beginnt unsere Trauung.</p>
                    <Schedule/>
                </div>
                <img src="../images/image.jpg">
                <div class="wrap">
                    <p>Wir bitten euch während der Zeremonie <strong>nicht</strong> zu fotografieren.</p>
                    <p>
                        Wir haben eine wunderbare Fotografin, die den Tag für uns festhält.<br>
                        Keine Sorge, ihr bekommt nach der Hochzeit alle Fotos per E-Mail zugeschickt.
                    </p>
                </div>
            </div>

            <img class="leaf" src="../images/zweig.png">

            <div>
                <div class="wrap">
                    <h2>Anreise</h2>
                    <p>
                        Der Oberhauser<br>
                        Kranzing 14<br>
                        4615 Holzhausen
                    </p>
                </div>
                <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.865460112851!2d14.088598615652886!3d48.24771727923232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477392069fe507a1%3A0x6734220a0c9bc331!2sDer%20Oberhauser%20Barbara%20Zehetner!5e0!3m2!1sde!2sat!4v1568143650824!5m2!1sde!2sat" width="600" height="450"></iframe>
                <div class="wrap">
                    <p>Damit ihr mit uns die Nacht durchfeiern könnt und keiner Taxi-Dienst spielen muss, organisieren
                        wir für euch einen Shuttle-Service.</p>
                    <p>Dieser bringt euch am Nachmittag rechtzeitig zur Trauung und in der Nacht stündlich wieder zurück
                        nach Linz.</p>
                    <p>Details dazu folgen noch.</p>
                </div>
            </div>

            <img class="leaf" src="../images/zweig.png">

            <div class="wrap">
                <h2>Geschenke & Spiele</h2>
                <p>
                    Am meisten würden wir uns über eine finanziellen Beitrag für unsere Feier freuen.
                    Das muss kein Cellophan-Ungetüm oder Geld in einem Betonblock sein – ein nettes Kuvert reicht uns völlig.
                </p>
                <p>Für Fragen und Ideen zur Feier und zu Spielen kontaktiert bitte Julia Fellner unter <a href="tel:+43 681 20592812">+43 681 20592812</a> oder <a href="mailto:julia.fellner@gmx.at">julia.fellner@gmx.at</a>.</p>
            </div>

            <img class="leaf" src="../images/zweig.png">

            <div class="wrap">
                <h2>Unterkünfte</h2>
                <p>Für unsere Gäste, die nicht aus Linz kommen, empfehlen wir folgende Hotels.</p>
                <p>Wir selbst werden die Nacht im Hotel am Domplatz verbringen.</p>
                <ul class="hotels">
                    <li class="hotels__hotel">
                        Hotel am Domplatz<br>
                        Stifterstraße 4<br>
                        <a href="tel:+43 732 773 000">+43 732 773000</a><br>
                        <a href="https://www.hotelamdomplatz.at/">www.hotelamdomplatz.at</a>
                    </li>
                    <li class="hotels__hotel">
                        Park Inn<br>
                        Hessenplatz 18<br>
                        <a href="tel:+43 732 777 100">+43 732 777 100</a><br>
                        <a href="https://www.radissonhotels.com/de-de/hotels/park-inn-linz">www.radissonhotels.com</a>
                    </li>
                    <li class="hotels__hotel">
                        Hotel Schillerpark<br>
                        Rainerstraße 2-4<br>
                        <a href="tel:+43 732 69 50 102">+43 732 69 50-102</a><br>
                        <a href="https://www.austria-trend.at/de/hotels/schillerpark">www.austria-trend.at</a>
                    </li>
                    <li class="hotels__hotel">
                        Ibis Linz City<br>
                        Kärntner Strasse 18-20<br>
                        <a href="tel:+43 732 69401">+43 732 69401</a><br>
                        <a href="https://www.accorhotels.com/de/hotel-1722-ibis-linz-city/index.shtml">www.accorhotels.com</a>
                    </li>
                </ul>
            </div>

            <img src="../images/blumen-2.png">
        </section>
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
        },
        methods: {
            async login() {
                this.isLoading = true;
                try {
                    const result = await this.$axios.get('/group', { headers: this.headers });
                    this.group = result.data;
                } catch (error) {
                    this.group = null;
                }
                this.isLoading = false;
            },
            async update() {
                this.isLoading = true;
                await this.$axios.post('/group', {
                    ...this.group,
                }, { headers: this.headers });
                this.isLoading = false;
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
        margin: 2.5rem auto 5rem;
        text-align: center;
    }

    .wrap {
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 30rem;

        &--entry {
            max-width: 20rem;
        }
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
        transition: background .25s;

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

        span {
            display: block;
        }
    }

    [type="text"],
    [type="email"],
    textarea {
        width: 100%;
        margin: 0.5rem 0 1rem;
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
        margin: 1rem auto;
    }

    .checkbox {
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

        &--checkmark::after {
            position: absolute;
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

    .hotels {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        list-style: none;
    }

    .hotels__hotel {
        width: 50%;
        margin-bottom: 1rem;
    }

    .map {
        border: 0;
        width: 100%;
    }
</style>
