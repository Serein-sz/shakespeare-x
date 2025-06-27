<script setup lang="ts">
import { Milkdown, useEditor } from "@milkdown/vue";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener";

const markdown: string = `# Milkdown Vue Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **Vue**.`;

useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, markdown);
      // Add markdown listener for auto-save
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        // Save content to your backend or storage
        saveToBackend(markdown);
      });
    })
    .use(commonmark)
    .use(listener)
)

const saveToBackend = (markdown: string) => {
  console.log("markdown: ", markdown);
}
</script>

<template>
  <Milkdown />
</template>
