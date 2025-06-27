<script setup lang="ts">
import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/vue";

const markdown: string = `# Milkdown Vue Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **Vue**.`;

useEditor((root) => {
  const crepe = new Crepe({ root, defaultValue: markdown })
  crepe.on(listener => {
    listener.markdownUpdated(() => {
      console.log("Markdown updated:", crepe.getMarkdown());
    });

  })
  return crepe;
}
)
</script>

<template>
  <Milkdown />
</template>
