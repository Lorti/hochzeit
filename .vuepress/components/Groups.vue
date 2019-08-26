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
                    @click.prevent="fetch"
                    :disabled="isLoading"
            >
                Anmelden
            </button>
        </template>
        <template v-else>
            <h1>
                Gästeliste
                <button @click="fetch" :disabled="isLoading">Liste aktualisieren</button>
                <select v-model="order">
                    <option value="group">Gruppe</option>
                    <option value="name">Name</option>
                    <option value="email">E-Mail</option>
                    <option value="attending">Zusage?</option>
                    <option value="vegetarian">Vegetarisch?</option>
                    <option value="custom">+1?</option>
                </select>
            </h1>
            <ul>
                <li>{{ groups.length }} Gruppen</li>
                <li>{{ guests.length }} Gäste</li>
                <li>{{ guests.filter(guest => guest.email).length }} E-Mail-Adressen</li>
                <li>{{ guests.filter(guest => guest.attending).length }} Zusagen</li>
                <li>{{ guests.filter(guest => guest.vegetarian).length }} vegetarische Hauptspeisen</li>
                <li>{{ guests.filter(guest => guest.custom).length }} +1s</li>
            </ul>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Gruppe</th>
                    <th>Code</th>
                    <th>E-Mail</th>
                    <th>Gast</th>
                    <th>Zusage?</th>
                    <th>Vegetarisch?</th>
                    <th>+1?</th>
                    <th>Gruppe darf +1 hinzufügen</th>
                    <th>Anmerkungen</th>
                </tr>
                <tr v-for="guest in sortedGuests">
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
                order: 'group'
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
                            password: group.password,
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
            sortedGuests() {
                return this.guests.sort((a, b) => {
                    let left = a[this.order];
                    let right = b[this.order];
                    if (typeof left === 'boolean') left = !left;
                    if (typeof right === 'boolean') right = !right;
                    if (left < right) return -1;
                    if (left > right) return 1;
                    return 0;
                });
            }
        },
        methods: {
            async fetch() {
                this.isLoading = true;
                const result = await this.$axios.get('/groups', { headers: this.headers });
                this.groups = result.data;
                this.isLoading = false;
            },
        }
    }
</script>
