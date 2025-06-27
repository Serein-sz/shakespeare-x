<script setup lang="ts">
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
</script>
<template>
  <div class="w-full flex justify-center">
    <div class="w-80 bg-amber-200"></div>
    <div class="w-[calc(100vw-40rem)] h-screen overflow-y-auto">
      <MilkdownEditorWrapper />
    </div>
    <div class="w-80 bg-amber-200">
    </div>
  </div>
</template>
