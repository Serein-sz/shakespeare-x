<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import MilkdownEditor from "./MilkdownEditor.vue";
</script>
<template>
  <div>
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  </div>
</template>
