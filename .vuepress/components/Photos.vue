<template>
  <main v-cloak>
    <h1 class="row">Danke für einen unvergesslichen Tag!</h1>
    <transition name="fade" mode="out-in">
      <section class="wrap wrap--s" v-if="!photos" key="entry">
        <form>
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
              Fotos anzeigen
            </button>
          </p>
        </form>
      </section>
      <section v-else key="content">
        <PhotoCategory class="row"
                       title="Lovebirds (284)"
                       teaser1="/lovebirds-1.jpg"
                       teaser2="/lovebirds-2.jpg"
                       teaser3="/lovebirds-3.jpg"/>
        <PhotoCategory class="row"
                       title="Trauung (217)"
                       teaser1="/trauung-1.jpg"
                       teaser2="/trauung-2.jpg"
                       teaser3="/trauung-3.jpg"/>
        <PhotoCategory class="row"
                       title="Fest (437)" :tilt-shift="true"
                       teaser1="/feier-1.jpg"
                       teaser2="/feier-2.jpg"
                       teaser3="/feier-3.jpg"/>
        <PhotoCategory class="row"
                       title="Gruppenfotos (62)"
                       teaser1="/gruppenfotos-1.jpg"
                       teaser2="/gruppenfotos-2.jpg"
                       teaser3="/gruppenfotos-3.jpg"/>
        <PhotoCategory class="row"
                       title="Fotobox/Greetix (158)" :tilt-shift="true"
                       teaser1="/fotobox-1.jpg"
                       teaser2="/fotobox-2.jpg"
                       teaser3="/fotobox-3.jpg"/>
      </section>
    </transition>
    <img class="decoration decoration--topLeft" src="../images/blumen-2.png">
    <img class="decoration decoration--bottomRight" src="../images/blumen-1.png">
  </main>
</template>

<script>
import PhotoCategory from './PhotoCategory.vue';

export default {
  components: {
    PhotoCategory,
  },
  data() {
    return {
      password: '',
      photos: null,
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
  created() {
    const password = localStorage.getItem('password');
    if (password) {
      this.password = password;
      this.login();
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const result = await this.$axios.get('/photos', {headers: this.headers});
        this.photos = result.data;
        localStorage.setItem('password', this.password);
      } catch (error) {
        this.photos = null;
        alert('Sorry, das ist leider der falsche Code!');
      }
      this.isLoading = false;
    },
  }
}
</script>

<style lang="scss">
@import "../theme/config";

body {
  position: relative;
  overflow-x: hidden;
}

main {
  margin: auto;
  max-width: 60rem;
  padding: 1rem;
}

h1 {
  text-align: center;
}

.row {
  margin: 3rem auto;
}

.decoration {
  position: absolute;
  z-index: -1;

  &--topLeft {
    top: 0;
    left: 0;
    transform: translate(-35%, -35%);
  }

  &--bottomRight {
    right: 0;
    bottom: 0;
    transform: translate(35%, 35%);
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
</style>
