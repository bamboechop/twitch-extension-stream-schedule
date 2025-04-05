<template>
  <main class="flex flex-col items-start justify-center h-screen gap-y-8 max-w-2xl mx-auto">
    <h1 class="text-5xl font-bold self-center">Twitch Extension Template</h1>
    <section>
      <p>This template is a starting point for building a Twitch extension using Vue 3 and Tailwind CSS.</p>
      <p>It includes a basic configuration and panel for your extension.</p>
      <p>You can use this template to build your own extension.</p>
      <p>If you have any questions, please refer to the <a href="https://dev.twitch.tv/docs/extensions/overview">Twitch Extension Documentation</a>.</p>
    </section>
    <nav class="flex flex-col gap-2">
      <p>The links below lead to the config and panel pages of your extension. You can use them to test your extension. They open in a new tab.</p>
      <section class="flex flex-row gap-2 self-center">
        <a class="text-blue-500 underline" href="/config" target="_blank">Config</a>
        <a class="text-blue-500 underline" href="/panel" target="_blank">Panel</a>
      </section>
      <p class="text-sm">Both pages will be loaded within iframes on the Twitch website. Keep this in mind when developing your extension.</p>
      <p class="text-sm">The panel is set to a max-width of 318px. This is the maximum width of an iframe on Twitch.</p>
    </nav>
    <div class="flex flex-col gap-2 items-center text-gray-500 self-center mt-8">
      <a class="text-blue-500 underline" href="https://github.com/twitchdev/twitch-extension-template" target="_blank">View the source code on GitHub</a>
      <p class="text-sm">This page is only available in development mode.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
