<template>
    <form>
        <fieldset v-show="!guest">
            <input type="text" v-model="password">
            <button v-if="password.length" @click.prevent="login">Anmelden</button>
        </fieldset>

        <fieldset v-if="guest">
            Hallo {{ guest.name }}!
            <input type="hidden" v-model="guest.id">
            <label>
                E-Mail
                <input type="email" v-model="guest.email">
            </label>
            <label>
                Telefonnummer
                <input type="text" v-model="guest.phone">
            </label>
            <label>
                <input type="checkbox" v-model="guest.attending"> Zusage?
            </label>
            <label>
                <input type="checkbox" v-model="guest.vegetarian"> Vegetarisch?
            </label>
            <label>
                Anmerkungen
                <textarea v-model="guest.message"></textarea>
            </label>
            <button @click.prevent="update">Änderungen speichern</button>
        </fieldset>
    </form>
</template>

<script>
    import axios from 'axios';

    const url = process.env.NODE_ENV === 'production' ?
        '/.netlify/functions/guest' :
        'http://localhost:9000/guest';

    export default {
        data() {
            return {
                password: '',
                guest: null,
            };
        },
        computed: {
            headers() {
                return {
                    Authorization: `Token ${this.password.toUpperCase()}`,
                };
            },
        },
        methods: {
            async login() {
                try {
                    const result = await axios.get(url, { headers: this.headers });
                    this.guest = result.data;
                } catch (error) {
                    this.guest = null;
                }
            },
            async update() {
                await axios.post(url, {
                    ...this.guest,
                }, { headers: this.headers });
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        display: block;
    }
</style>
