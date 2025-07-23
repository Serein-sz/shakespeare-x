<script setup lang="ts">
import {onMounted, useTemplateRef, watch} from "vue";
import {Crepe} from "@milkdown/crepe";
import {Milkdown, useEditor} from "@milkdown/vue";
import {replaceAll} from "@milkdown/kit/utils"
import {slashFactory} from '@milkdown/kit/plugin/slash';
import {usePluginViewFactory} from '@prosemirror-adapter/vue';
import Slash from './components/Slash.vue';
import {useDocumentStore} from "@/stores/document";
import {storeToRefs} from "pinia";

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
      if (!editorWrapperRef.value) {
        return;
      }
      disableSpellcheck(editorWrapperRef.value)
    });
  })
  return crepe;
})

watch(() => id.value, () => {
  const instance = get();
  instance?.action(replaceAll(markdown.value))
})

const tooltip = slashFactory('Commands');
const pluginViewFactory = usePluginViewFactory();

onMounted(() => {
  if (!editorWrapperRef.value) {
    return;
  }
  disableSpellcheck(editorWrapperRef.value);
  const instance = get();
  instance?.config((ctx) => {
    ctx.set(tooltip.key, {
      view: pluginViewFactory({
        component: Slash
      }),
    })
  })
    .use(tooltip)
})

function disableSpellcheck(element: HTMLElement) {
  if (element.tagName === "svg") {
    return;
  }
  // 设置当前元素
  element.spellcheck = false;
  if (!element.children) {
    return;
  }
  // 递归处理所有子元素
  for (let child of element.children) {
    disableSpellcheck(child as HTMLElement);
  }
}

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
