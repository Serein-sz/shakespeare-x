<script setup lang="ts">
import { useTemplateRef } from "vue";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/vue";
import { useDocumentStore } from "@/stores/document";

const { markdown, updateTitleElements } = useDocumentStore();
const editorWrapperRef = useTemplateRef<HTMLDivElement | null>('editorWrapperRef');

function updateTitle() {
  if (!editorWrapperRef.value) {
    console.error("Editor wrapper reference is not set.");
    return;
  }
  const titles = Array.from(editorWrapperRef.value.querySelectorAll(`
    .milkdown > div:nth-child(1) h1, 
    .milkdown > div:nth-child(1) h2, 
    .milkdown > div:nth-child(1) h3, 
    .milkdown > div:nth-child(1) h4, 
    .milkdown > div:nth-child(1) h5, 
    .milkdown > div:nth-child(1) h6
  `));
  if (!titles) {
    console.warn("No title elements found.");
    return;
  }
  updateTitleElements(titles);
}

useEditor(root => {
  const crepe = new Crepe({ root, defaultValue: markdown })
  crepe.on(listener => {
    listener.mounted(() => {
      console.log("Crepe editor mounted");
      updateTitle()
    });
    listener.markdownUpdated(() => {
      updateTitle();
    });

  })
  return crepe;
})
</script>

<template>
  <div ref="editorWrapperRef" class="h-full bg-[#1A1A1A]">
    <Milkdown class="h-full" />
  </div>
</template>
<style scoped>
:deep .milkdown>div:nth-child(1) {
  min-height: 100vh;
}
</style>
