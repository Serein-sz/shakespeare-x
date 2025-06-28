<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { Separator } from '@/components/ui/separator'
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
import TitleView from "./TitleView.vue";


const editorWrapperRef = useTemplateRef<HTMLDivElement | null>('editorWrapperRef');

onMounted(() => {
  if (!editorWrapperRef.value) {
    console.error("Editor wrapper reference is not set.");
    return;
  }
})
</script>
<template>
  <div class="w-full h-screen flex justify-center bg-[#1A1A1A]">
    <div class="w-80"></div>
    <Separator orientation="vertical" />
    <div class="w-[calc(100vw-40rem)] h-screen overflow-y-auto">
      <MilkdownEditorWrapper ref="editorWrapperRef" />
    </div>
    <Separator orientation="vertical" class="w-1" />
    <TitleView class="w-80 h-full overflow-y-auto mt-12" />
  </div>
</template>
