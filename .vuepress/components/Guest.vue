<template>
    <form autocomplete="off">
        <div v-if="!guest">
            <input
                    type="text"
                    :value="password.toUpperCase()"
                    @input="password = $event.target.value.toUpperCase()"
                    autofocus
            >
            <button
                    v-if="password.length"
                    @click.prevent="login"
                    :disabled="isLoading"
            >
                Anmelden
            </button>
        </div>

        <div v-else>
            Hallo {{ guest.name }}!
            <input type="hidden" v-model="password">
            <input type="hidden" v-model="guest.id">
            <label>
                <span>E-Mail</span>
                <input type="email" v-model="guest.email" autocomplete="email" autocapitalize="none">
            </label>
            <label>
                <span>Telefonnummer</span>
                <input type="tel" v-model="guest.phone" autocomplete="tel" autocapitalize="none">
            </label>
            <label>
                <input type="checkbox" v-model="guest.attending"> Ja, ich/wir kommen
            </label>
            <label>
                <input type="checkbox" v-model="guest.vegetarian">
                Ich möchte eine vegetarische Hauptspeise
                <small>(restliche Gänge sind ohnehin vegetarisch)</small>
            </label>
            <label>
                <span>Anmerkungen</span>
                <textarea v-model="guest.message" rows="5" cols="20"></textarea>
            </label>
            <button
                    @click.prevent="update"
                    :disabled="isLoading"
            >
                Änderungen speichern
            </button>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                password: '',
                guest: null,
                isLoading: false,
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
                this.isLoading = true;
                try {
                    const result = await this.$axios.get('/guest', { headers: this.headers });
                    this.guest = result.data;
                } catch (error) {
                    this.guest = null;
                }
                this.isLoading = false;
            },
            async update() {
                this.isLoading = true;
                await this.$axios.post('/guest', {
                    ...this.guest,
                }, { headers: this.headers });
                this.isLoading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        display: block;

        span {
            display: block;
        }
    }
</style>
