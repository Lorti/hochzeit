<template>
  <img :class="tilt" :src="src" alt="Photo">
</template>

<script>
export default {
  props: {
    src: String,
    width: String,
    tilt: {
      validator: function (value) {
        return ['left', 'right'].includes(value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  border: .5rem solid white;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .25);
}

.left {
  transform: rotateZ(-5deg);
}

.right {
  transform: rotateZ(5deg);
}
</style>
