<script setup lang="ts">
import {Separator} from '@/components/ui/separator'
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
import TitleView from "./TitleView.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
</script>
<template>
  <ScrollArea class="w-full max-h-screen" ref="scrollAreaRef">
    <MilkdownEditorWrapper ref="editorWrapperRef"/>
  </ScrollArea>
  <Separator orientation="vertical" class="w-1"/>
  <ScrollArea class="max-h-screen">
    <TitleView class="w-60 my-6 py-6"/>
  </ScrollArea>
</template>
