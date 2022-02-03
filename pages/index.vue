<template>
  <div class="max-w-[600px] mx-auto md:mt-20 p-4">
    <div class="w-full rounded-lg bg-white p-6">
      <h1 class="text-black font-bold text-3xl text-center">Spotify History</h1>

      <p class="text-slate-500 my-10 text-lg text-center">
        Demo application built with
        <a
          target="_blank"
          class="text-black underline"
          href="https://appwrite.io/"
          >Appwrite</a
        >
        to showcase new OAuth capabilities of Appwrite.
      </p>

      <div class="flex justify-center">
        <button
          @click="onLogin()"
          class="bg-[#1DB954] text-white px-6 py-2 rounded-full"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '../services/appwrite'

export default Vue.extend({
  methods: {
    onLogin() {
      AppwriteService.login()
    },
  },
})
</script>
