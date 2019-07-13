<template>
    <form autocomplete="off">
        <div v-if="!guests">
            <input
                    type="text"
                    v-model="password"
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
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Telefonnummer</th>
                    <th>Zusage?</th>
                    <th>Vegetarisch?</th>
                    <th>Anmerkungen</th>
                </tr>
                <tr v-for="guest in guests">
                    <td v-for="value in guest">
                        <template v-if="typeof value === 'boolean'">
                            <template v-if="value">✔</template>
                        </template>
                        <template v-else>{{ value }}</template>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                password: '',
                guests: null,
                isLoading: false,
            };
        },
        computed: {
            headers() {
                return {
                    Authorization: `Token ${this.password}`,
                };
            },
        },
        methods: {
            async login() {
                this.isLoading = true;
                const result = await this.$axios.get('/guests', { headers: this.headers });
                this.guests = result.data;
                this.isLoading = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    td {
        text-align: center;
    }
</style>
