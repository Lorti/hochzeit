<template>
  <div class="category">
    <div class="category__text">
      <h2 class="category__title">{{ title }}</h2>
      <a class="category__link" :href="dropboxLink" target="_blank">Fotos auf Dropbox ansehen</a>
      <a class="category__link" :href="weTransferLink" target="_blank">Fotos herunterladen</a>
    </div>
    <Frame class="category__teaser" :src="teaser1" :tilt="tiltShift ? 'left' : 'right'"/>
    <Frame class="category__teaser" :src="teaser2" :tilt="tiltShift ? 'right' : 'left'"/>
    <Frame class="category__teaser" :src="teaser3" :tilt="tiltShift ? 'left' : 'right'"/>
  </div>
</template>

<script>
import Frame from './Frame.vue';

export default {
  components: {
    Frame,
  },
  props: {
    title: String,
    dropboxLink: String,
    weTransferLink: String,
    teaser1: String,
    teaser2: String,
    teaser3: String,
    tiltShift: Boolean,
  }
}
</script>

<style lang="scss" scoped>
@import "../theme/config";

.category {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: 30rem) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: normal;
  }
}

.category__text {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;

  @media (min-width: 30rem) {
    width: 18rem;
    min-width: 18rem;
    margin-bottom: 0;
  }
}

.category__title {
  margin: 0;
}

.category__link {
}

.category__teaser {
  max-width: 12rem;
  max-height: 12rem;
}
</style>
