<template>
  <div class="category">
    <div class="category__text">
      <h2 class="category__title">{{ title }}</h2>
      <a class="category__link" :href="dropboxLink">Fotos auf Dropbox ansehen</a>
      <a class="category__link" :href="weTransferLink">Fotos über WeTransfer herunterladen</a>
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
  align-items: center;
}

.category__text {
  display: flex;
  flex-direction: column;
  margin-right: 3rem;
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
