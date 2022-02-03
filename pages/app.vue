<template>
  <div class="max-w-[600px] mx-auto md:mt-20 p-4">
    <div class="w-full rounded-lg bg-white p-6">
      <h1 class="text-black font-bold text-3xl text-center">Spotify History</h1>

      <p v-if="me" class="text-slate-500 my-10 text-lg text-center">
        Welcome {{ me.name }}!
      </p>

      <div class="mb-12">
        <div v-if="isLoadingTracks" class="flex justify-center text-[#1DB954]">
          <svg
            class="w-6 h-6 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <div v-if="!isLoadingTracks">
          <p v-if="tracks.length <= 0" class="text-[#1DB954] text-center">
            No tracks found. Go and listen to some!
            <span
              @click="onRefreshTracks()"
              class="cursor-pointer font-bold underline"
              >Refresh</span
            >
          </p>

          <div class="flex flex-col space-y-3">
            <div
              class="p-4 rounded-lg bg-slate-100 shadow-sm"
              v-for="track of tracks"
              :key="track.id"
            >
              <div class="flex space-x-3">
                <div
                  class="
                    rounded-lg
                    overflow-hidden
                    w-full
                    max-w-[150px]
                    aspect-square
                  "
                >
                  <img
                    :src="track.image"
                    class="
                      shadow-inner
                      rouded-lg
                      w-full
                      h-full
                      object-cover object-center
                    "
                    alt="Album preview"
                  />
                </div>

                <div>
                  <h3 class="text-black font-bold text-lg">
                    {{ track.name }}
                    <span class="text-slate-600 font-light text-sm">
                      • {{ Math.ceil(track.duration / 1000) }}sec
                    </span>
                  </h3>
                  <div class="mt-2">
                    <small class="text-slate-600 font-light text-sm"
                      >Played {{ getDateVerbose(track.playedAt) }}</small
                    >
                  </div>

                  <div class="mt-4">
                    <a :href="track.url" target="_blank">
                      <button
                        class="
                          hover:bg-slate-50
                          p-2
                          px-4
                          flex
                          justify-center
                          space-x-3
                          bg-white
                          rounded-full
                          text-[#1DB954]
                        "
                      >
                        <p>Play Again</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="onLogout"
          class="
            flex
            items-center
            justify-center
            space-x-3
            text-[#1DB954]
            bg-gray-100
            px-6
            py-2
            rounded-full
          "
        >
          <svg
            v-if="isLoggingOut"
            class="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Appwrite, Models } from 'fake-appwrite'
import { AppwriteService } from '../services/appwrite'

export default Vue.extend({
  async mounted() {
    this.me = await AppwriteService.getMe()
    await this.onRefreshTracks()
  },
  data() {
    return {
      isLoggingOut: false,
      isLoadingTracks: true,
      me: null as null | Models.User<any>,
      tracks: [] as any[],
    }
  },
  methods: {
    async onRefreshTracks() {
      this.isLoadingTracks = true
      this.tracks = await AppwriteService.getRecentTracks()
      this.isLoadingTracks = false
    },
    async onLogout() {
      this.isLoggingOut = true
      await AppwriteService.logout()
      this.$router.push('/')
    },
    getDateVerbose(date: Date) {
      return `at ${date.getHours()}:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      } on ${date.getDate()}.${date.getMonth() + 1}.`
    },
  },
})
</script>
