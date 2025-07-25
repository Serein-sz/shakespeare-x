<script setup lang="ts">
import {Separator} from '@/components/ui/separator'
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
import TitleView from "./TitleView.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useDocumentStore} from "@/stores/document.ts";
import {storeToRefs} from "pinia";
import {useTemplateRef} from "vue";

const store = useDocumentStore();

const {titleElements} = storeToRefs(store);
const editorWrapperRef = useTemplateRef("editorWrapperRef");

const scrollArea = (event: Event) => {
  // do something, it will be called at most 1 time per second
  const scrollAreaElement = event.target as HTMLElement;
  const scrollTop = scrollAreaElement.scrollTop;

  // 获取所有标题元素
  const titles = Array.from<HTMLElement>(editorWrapperRef.value.$el.nextElementSibling.querySelectorAll(`
    .milkdown > div:nth-child(1) h1,
    .milkdown > div:nth-child(1) h2,
    .milkdown > div:nth-child(1) h3,
    .milkdown > div:nth-child(1) h4,
    .milkdown > div:nth-child(1) h5,
    .milkdown > div:nth-child(1) h6
  `));

  // 找出当前位于顶部的标题元素
  let currentTopTitle: HTMLElement | null = null;
  let currentTopTitleIndex: number = -1;
  let closestTitleDistance = Number.MAX_VALUE;

  titles.forEach((title, index) => {
    const rect = title.getBoundingClientRect();
    const scrollAreaRect = scrollAreaElement.getBoundingClientRect();
    // 计算标题元素相对于滚动区域的位置
    const relativeTop = rect.top - scrollAreaRect.top + scrollTop;
    const distanceToTop = Math.abs(relativeTop - scrollTop);

    // 找到距离顶部最近的标题元素
    if (distanceToTop < closestTitleDistance) {
      closestTitleDistance = distanceToTop;
      currentTopTitle = title;
      currentTopTitleIndex = index;
    }
  });

  // 打印当前顶部标题元素信息
  if (currentTopTitle) {
    store.activeTitle(currentTopTitleIndex)
  }
}


</script>
<template>
  <div class="w-full flex">
    <ScrollArea class="w-full h-screen bg-[#1A1A1A]" ref="scrollAreaRef" @scrollArea="scrollArea">
      <MilkdownEditorWrapper ref="editorWrapperRef"/>
    </ScrollArea>
    <Separator orientation="vertical" class="w-1"/>
    <ScrollArea class="max-h-screen">
      <TitleView class="w-60 my-6 py-6"/>
    </ScrollArea>
  </div>
</template>
