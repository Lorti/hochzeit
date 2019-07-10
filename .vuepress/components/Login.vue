<template>
    <div>
        <fieldset>
            <input type="text" v-model="password">
            <button v-if="password.length" @click="login">Anmelden</button>
        </fieldset>
        <fieldset v-if="guest">
            <label>
                Name
                <input type="text" v-model="guest.name">
            </label>
            <label>
                E-Mail
                <input type="text" v-model="guest.email">
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
            <button>Änderungen speichern</button>
        </fieldset>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                password: '',
                guest: null,
            };
        },
        methods: {
            async login() {
                try {
                    const result = await axios.post(
                        process.env.NODE_ENV === 'production' ?
                            '/.netlify/functions/guest' :
                            'http://localhost:9000/guest',
                        { password: this.password.toUpperCase() }
                    );
                    this.guest = result.data;
                } catch (error) {
                    this.guest = null;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        display: block;
    }
</style>
