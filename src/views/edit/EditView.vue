<script setup lang="ts">
import {Separator} from '@/components/ui/separator'
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
import TitleView from "./TitleView.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {VideoText} from "@/components/ui/video-text";
import {useDocumentStore} from "@/stores/document.ts";

const store = useDocumentStore()
</script>
<template>
  <div class="w-full">
    <ScrollArea class="w-full h-screen bg-[#1A1A1A]" ref="scrollAreaRef">
      <div v-if="store.id === ''" class="flex flex-col justify-center h-screen bg-[#1A1A1A]">
        <div class="relative h-[200px] w-full overflow-hidden">
          <VideoText src="/ocean-small.webm" fontSize="96">
            Shakesperare-X
          </VideoText>
        </div>
      </div>
      <MilkdownEditorWrapper ref="editorWrapperRef" v-else/>
    </ScrollArea>
    <Separator orientation="vertical" class="w-1"/>
    <ScrollArea class="max-h-screen">
      <TitleView class="w-60 my-6 py-6"/>
    </ScrollArea>
  </div>
</template>
