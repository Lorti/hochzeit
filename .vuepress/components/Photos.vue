<template>
  <div v-cloak>
    <transition name="fade" mode="out-in">
      <form autocomplete="off" class="wrap wrap--s" v-if="!photos" key="entry">
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
      <main v-else key="content">
        <h1 class="row">Danke für einen unvergesslichen Tag!</h1>
        <PhotoCategory class="row"
                       title="Lovebirds"
                       :dropbox-link="photos.lovebirdsDropboxLink"
                       :we-transfer-link="photos.lovebirdsWeTransferLink"
                       teaser1="/lovebirds-1.jpg"
                       teaser2="/lovebirds-2.jpg"
                       teaser3="/lovebirds-3.jpg"/>
        <PhotoCategory class="row"
                       title="Trauung"
                       :tilt-shift="true"
                       :dropbox-link="photos.weddingCeremonyDropboxLink"
                       :we-transfer-link="photos.weddingCeremonyWeTransferLink"
                       teaser1="/trauung-1.jpg"
                       teaser2="/trauung-2.jpg"
                       teaser3="/trauung-3.jpg"/>
        <PhotoCategory class="row"
                       title="Fest & Details"
                       :dropbox-link="photos.partyDropboxLink"
                       :we-transfer-link="photos.partyWeTransferLink"
                       teaser1="/feier-1.jpg"
                       teaser2="/feier-2.jpg"
                       teaser3="/feier-3.jpg"/>
        <PhotoCategory class="row"
                       title="Gruppenfotos"
                       :tilt-shift="true"
                       :dropbox-link="photos.groupPicturesDropboxLink"
                       :we-transfer-link="photos.groupPicturesWeTransferLink"
                       teaser1="/gruppenfotos-1.jpg"
                       teaser2="/gruppenfotos-2.jpg"
                       teaser3="/gruppenfotos-3.jpg"/>
        <PhotoCategory class="row"
                       title="Fotobox, Greetix & Handyfotos/-videos"
                       :dropbox-link="photos.guestAdditionsDropboxLink"
                       :we-transfer-link="photos.guestAdditionsWeTransferLink"
                       teaser1="/fotobox-1.jpg"
                       teaser2="/fotobox-2.jpg"
                       teaser3="/fotobox-3.jpg"/>
        <img class="decoration decoration--topLeft" src="../images/blumen-2.png">
        <img class="decoration decoration--bottomRight" src="../images/blumen-1.png">
      </main>
    </transition>
  </div>
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
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const result = await this.$axios.get('/photos', {headers: this.headers});
        this.photos = result.data;
      } catch (error) {
        alert('Sorry, das ist leider der falsche Code!');
        this.photos = null;
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

form {
  margin: auto;
  max-width: 20rem;
  padding: 1rem;
  text-align: center;
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

button {
  border: none;
  padding: .5rem 1rem;
  font-size: inherit;
  color: #fff;
  background: $main-color;
  border-radius: 3px;
  transition: all .25s;

  &:hover {
    background: $hover-color;
    cursor: pointer;
  }

  &:disabled {
    opacity: .5;
  }
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

.decoration {
  position: absolute;
  z-index: -1;

  &--topLeft {
    top: 0;
    left: 0;
    width: 255px;
    height: 174px;
    transform: translate(-35%, -35%);
  }

  &--bottomRight {
    right: 0;
    bottom: 0;
    width: 212px;
    height: 150px;
    transform: translate(35%, 35%);
  }

  @media (min-width: 60rem) {
    width: auto;
    height: auto;
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
