<script setup lang="ts">
import {ChevronRight} from 'lucide-vue-next'
import {computed, ref} from "vue";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import TreeItem from "@/components/ui/tree/TreeItem.vue";
import type {TreeNode} from "@/components/ui/tree/index.ts";

const props = defineProps<{
  node: TreeNode
  deep: number
}>()

const isOpen = ref<boolean>(false)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    :style="{ 'padding-left': `${props.deep * 0.5}rem` }"
  >
    <div
      class="flex justify-between items-center h-[32px] mx-2 p-2 rounded-md dark:hover:bg-sidebar-accent">
      <div class="flex justify-between items-center gap-2">
        <component :is="node.icon" class="size-4"/>
        <span class="text-sm select-none">{{ node.label }}</span>
      </div>
      <CollapsibleTrigger as-child v-if="hasChildren">
        <ChevronRight class="size-4 transition-all transition-duration-300"
                      :class="{ 'rotate-90': isOpen }"/>
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent>
      <TreeItem v-for="node in props.node.children" :key="node.id" :node="node"
                :deep="props.deep + 1"/>
    </CollapsibleContent>
  </Collapsible>
</template>

<style scoped>

</style>
