<template>
    <form autocomplete="off">
        <section class="code" v-if="!group">
            <h1>Willkommen auf unserer Hochzeits-Website!</h1>
            <p>Auf unserer Einladung steht ein Code, den du im unten stehenden Feld eingeben kannst, um dich anzumelden.</p>
            <input
                class="code__input"
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
            <h1>Hallo {{ group.name }}!</h1>
            <input type="hidden" v-model="password">
            <input type="hidden" v-model="group.id">
            <fieldset v-for="guest in group.guests">
                <label v-if="guest.custom">
                    <span>Name der Begleitung</span>
                    <input type="email" v-model="guest.name">
                </label>
                <template v-else>
                    {{ guest.name }}
                </template>
                <label>
                    <input type="checkbox" v-model="guest.attending"> Ja, ich komme gerne zu eurer Hochzeit
                </label>
                <label>
                    <input type="checkbox" v-model="guest.vegetarian">
                    Ich möchte eine vegetarische Hauptspeise
                    <small>(restliche Gänge sind ohnehin vegetarisch)</small>
                </label>
            </fieldset>
            <button
                v-if="showPlusOneButton"
                @click.prevent="addPlusOneGuest"
            >
                Ich möchte eine Begleitung mitnehmen …
            </button>
            <fieldset>
                <label>
                    <span>E-Mail</span>
                    <input type="email" v-model="group.email" autocomplete="email" autocapitalize="none">
                </label>
                <label>
                    <span>Anmerkungen</span>
                    <textarea v-model="group.message" rows="5" cols="20"></textarea>
                </label>
            </fieldset>
            <button
                @click.prevent="update"
                :disabled="isLoading"
            >
                Änderungen speichern
            </button>
        </section>
    </form>
</template>

<script>
    export default {
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

    section {
        margin: 2.5rem auto 5rem;
        max-width: 30rem;
        text-align: center;
    }

    label {
        display: block;

        span {
            display: block;
        }
    }

    fieldset {
        border: none;
        text-align: left;
    }

    [type="text"],
    [type="email"],
    textarea {
        width: 100%;
    }

    .code {
        margin-left: auto;
        margin-right: auto;
        max-width: 20rem;
    }

    .code__input {
        display: block;
        margin-bottom: 1rem;
        border: none;
        border-bottom: 2px solid black;
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
</style>
