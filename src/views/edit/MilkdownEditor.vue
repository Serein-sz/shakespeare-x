<script setup lang="ts">
import {useTemplateRef, watch} from "vue";
import {Crepe} from "@milkdown/crepe";
import {Milkdown, useEditor} from "@milkdown/vue";
import {replaceAll} from "@milkdown/kit/utils"
import {useDocumentStore} from "@/stores/document";
import {storeToRefs} from "pinia";
import {TextHoverEffect} from "@/components/ui/text-hover-effect";

const store = useDocumentStore();
const {id, markdown} = storeToRefs(store);
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
  store.updateTitleElements(titles as HTMLElement[]);
}

const {get} = useEditor((root: HTMLDivElement) => {
  const crepe = new Crepe({root, defaultValue: markdown.value})
  crepe.on(listener => {
    listener.mounted(() => {
      console.log("Crepe editor mounted");
      updateTitle()
    });
    listener.markdownUpdated(() => {
      store.update(crepe.getMarkdown())
      updateTitle();
    });
  })
  return crepe;
})

watch(() => id.value, () => {
  const instance = get();
  instance?.action(replaceAll(markdown.value))
})

</script>

<template>
  <div ref="editorWrapperRef" class="h-full bg-[#1A1A1A]">
    <Milkdown/>
  </div>
</template>
<style scoped>
:deep(.milkdown > div:nth-child(1)) {
  min-height: 100vh;
}
</style>
