<template>
    <form autocomplete="off">
        <div v-if="!group">
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
            Hallo {{ group.name }}!
            <input type="hidden" v-model="password">
            <input type="hidden" v-model="group.id">
            <label>
                <span>E-Mail</span>
                <input type="email" v-model="group.email" autocomplete="email" autocapitalize="none">
            </label>
            <template v-for="guest in group.guests">
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
            </template>
            <button
                v-if="showPlusOneButton"
                @click.prevent="addPlusOneGuest"
            >
                Ich möchte eine Begleitung mitnehmen …
            </button>
            <label>
                <span>Anmerkungen</span>
                <textarea v-model="group.message" rows="5" cols="20"></textarea>
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
    label {
        display: block;

        span {
            display: block;
        }
    }
</style>
