<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useDocumentStore } from "@/stores/document";

const store = useDocumentStore();

const markerRef = useTemplateRef<HTMLDivElement | null>('markerRef');

function scroll(event, element: HTMLElement) {
  if (!markerRef.value) {
    console.error("Marker reference is not set.");
    return;
  }
  markerRef.value.style.top = `calc(${event.target.offsetTop}px + 0.375rem)`;
  element.scrollIntoView({
    behavior: 'smooth', // 可选：'auto'（立即滚动）或 'smooth'（平滑滚动）
    block: 'start'      // 使元素顶部对齐容器顶部
  });
}

</script>
<template>
  <nav>
    <div v-if="store.titleElements && store.titleElements.length > 0" class="relative">
      <div ref="markerRef" class="absolute bg-[#a8b1ff] w-[2px] h-6 left-[-1px] top-[0.375rem]" />
      <div v-for="item in store.titleElements" :key="item" @click="event => scroll(event, item)"
        class="cursor-pointer text-[#98989f] hover:text-[#dfdfd6] m-2 py-1 px-2 border rounded-md">
        {{ item.innerText }}
      </div>
    </div>
  </nav>
</template>
