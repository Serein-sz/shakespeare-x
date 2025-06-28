<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/vue";
import { useDocumentStore } from "@/stores/document";

const { markdown, update, updateTitleElements } = useDocumentStore();
const editorWrapperRef = useTemplateRef<HTMLDivElement | null>('editorWrapperRef');

onMounted(() => {

})

useEditor(root => {
  const crepe = new Crepe({ root, defaultValue: markdown })
  crepe.on(listener => {
    listener.mounted(() => {
      console.log("Crepe editor mounted");
      if (!editorWrapperRef.value) {
        console.error("Editor wrapper reference is not set.");
        return;
      }
      const titles = editorWrapperRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
      updateTitleElements(Array.from(titles))
    });
    listener.markdownUpdated(() => {
      update(crepe.getMarkdown())
    });

  })
  return crepe;
})
</script>

<template>
  <div ref="editorWrapperRef">
    <Milkdown />
  </div>
</template>
