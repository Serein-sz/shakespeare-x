<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import AppSidebar from '@/views/edit/AppSidebar.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import MilkdownEditorWrapper from "./MilkdownEditorWrapper.vue"
import TitleView from "./TitleView.vue";
import {ScrollArea} from "@/components/ui/scroll-area";


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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset class="flex flex-row w-full h-full">
        <ScrollArea class="w-full max-h-screen">
          <MilkdownEditorWrapper ref="editorWrapperRef" />
        </ScrollArea>
<!--        <div class="w-full h-screen overflow-y-auto">-->
<!--          -->
<!--        </div>-->
        <Separator orientation="vertical" class="w-1" />
        <TitleView class="w-80 overflow-y-auto my-6 py-6" />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
