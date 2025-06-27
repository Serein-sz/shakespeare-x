<script setup lang="ts">
import {onMounted, useTemplateRef} from "vue";
import {DispatchEventHandler} from "@/lib/controllers/core.ts";
import {createDrawEvent} from "@/lib/events.ts";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef")
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef")

onMounted(() => {
  if (!containerRef.value || !canvasRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const verticalScrollbarWidth = containerRef.value.offsetWidth - containerRef.value.clientWidth;
  const horizontalScrollbarHeight = containerRef.value.offsetHeight - containerRef.value.clientHeight;
  canvasRef.value.width = rect.width - verticalScrollbarWidth;
  canvasRef.value.height = rect.height - horizontalScrollbarHeight;
  const context = canvasRef.value.getContext('2d');
  const dispatchEventHandler = new DispatchEventHandler(context!, canvasRef.value.width, canvasRef.value.height);
  dispatchEventHandler.dispatch(createDrawEvent())
})


</script>

<template>
  <div class="h-[calc(100vh-6rem)] overflow-scroll" ref="containerRef">
    <canvas ref="canvasRef"/>
  </div>
</template>

<style scoped>

</style>
