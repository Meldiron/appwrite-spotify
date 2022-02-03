<template>
  <div>
    <Nuxt />

    <!-- 'Made with Appwrite' badge -->
    <a
      href="https://appwrite.io/"
      target="_blank"
      style="position: fixed; right: 18px; bottom: 18px; z-index: 999"
    >
      <img
        style="width: 130px"
        src="https://appwrite.io/images-ee/press/badge-pink-box.svg"
        alt="Built with Appwrite"
      />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    document.body.classList.add('bg-[#191414]')
  },
})
</script>