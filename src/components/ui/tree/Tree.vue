<script setup lang="ts">
import TreeItem from "@/components/ui/tree/TreeItem.tsx";
import type {TreeNode} from "@/components/ui/tree/index.ts";

const props = defineProps<{
  data: TreeNode[]
}>()

defineSlots<{
  content(props: { node: TreeNode }): never
}>()

</script>
<template>
  <div>
    <TreeItem v-for="item in props.data" :key="item.id" :node="item" :depth="0">
      <template v-if="$slots.content" #content="{ node }">
        <slot name="content" :node="node"/>
      </template>
    </TreeItem>
  </div>
</template>
