<template>
    <form autocomplete="off">
        <template v-if="!groups">
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
        </template>
        <template v-else>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Gruppe</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Zusage?</th>
                    <th>Vegetarisch?</th>
                    <th>+1?</th>
                    <th>Gast darf +1 hinzufügen</th>
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
        </template>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                password: '',
                groups: null,
                isLoading: false,
            };
        },
        computed: {
            headers() {
                return {
                    Authorization: `Token ${this.password}`,
                };
            },
            guests() {
                return this.groups.reduce((accumulator, group) => {
                    group.guests.forEach(guest => {
                        accumulator.push({
                            id: group.id,
                            group: group.name,
                            email: group.email,
                            name: guest.name,
                            attending: guest.attending,
                            vegetarian: guest.vegetarian,
                            custom: guest.custom,
                            guests_editable: group.guests_editable,
                            message: group.message,
                        })
                    });
                    return accumulator;
                }, []);
            },
        },
        methods: {
            async login() {
                this.isLoading = true;
                const result = await this.$axios.get('/groups', { headers: this.headers });
                this.groups = result.data;
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
