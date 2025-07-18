<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import {useDocumentStore} from "@/stores/document";

const store = useDocumentStore();

const markerRef = useTemplateRef<HTMLDivElement | null>('markerRef');
const currentActiveElement = ref<HTMLElement | null>(null);

function activeTitle(event: MouseEvent, element: HTMLElement) {
  currentActiveElement.value = element;
  if (!markerRef.value) {
    console.error("Marker reference is not set.");
    return;
  }
  const target = event.target as HTMLElement;
  markerRef.value.style.top = `calc(${target.offsetTop}px + 0.375rem)`;
  // element.scrollIntoView({
  //   behavior: 'smooth', // 可选：'auto'（立即滚动）或 'smooth'（平滑滚动）
  //   block: 'start'      // 使元素顶部对齐容器顶部
  // });
}

function getTitleLevel(element: HTMLElement): number {
  const tagName = element.tagName.toLowerCase();
  switch (tagName) {
    case 'h1':
      return 1;
    case 'h2':
      return 2;
    case 'h3':
      return 3;
    case 'h4':
      return 4;
    case 'h5':
      return 5;
    case 'h6':
      return 6;
    default:
      return 0; // 如果不是标题元素，返回0
  }

}

</script>
<template>
  <nav v-if="store.titleElements && store.titleElements.length > 0">
    <div class="relative pl-4">
      <div ref="markerRef" class="absolute bg-[#a8b1ff] w-[2px] h-6 left-[-1px] top-[0.375rem]
      transition-[top] duration-[250ms] ease-[cubic-bezier(0,1,0.5,1)]"/>
      <div v-for="(item, index) in store.titleElements" :key="index"
           @click="event => activeTitle(event, item)"
           class="cursor-pointer text-sm text-[#98989f] hover:text-[#dfdfd6] m-2 py-1 rounded-md"
           :class="{ [`h${getTitleLevel(item)}`]: true, 'text-[#dfdfd6]': currentActiveElement === item }">
        {{ item.innerText }}
      </div>
    </div>
  </nav>
</template>
<style scoped>
.h1 {
  padding-left: 0px;
  padding-right: 0px;
}

.h2 {
  padding-left: 16px;
  padding-right: 16px;
}

.h3 {
  padding-left: 32px;
  padding-right: 32px;
}

.h4 {
  padding-left: 48px;
  padding-right: 48px;
}

.h5 {
  padding-left: 64px;
  padding-right: 64px;
}

.h6 {
  padding-left: 80px;
  padding-right: 80px;
}
</style>
