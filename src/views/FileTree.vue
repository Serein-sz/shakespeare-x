<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
import Tree from "../components/ui/tree/Tree.vue";
import {FileMinus, Folder} from "lucide-vue-next";

const treeData = [
  {
    label: '节点2',
    value: '2',
    icon: Folder,
    type: 'folder',
    children: [
      {
        label: '节点2-1',
        value: '21',
        icon: FileMinus,
        type: 'file',
      },
      {
        label: '节点2-2',
        value: '22',
        icon: FileMinus,
        type: 'file',
      },
      {
        label: '节点2-13',
        value: '23',
        icon: FileMinus,
        type: 'file',
      },
    ]
  },
  {
    label: 'Playground',
    value: '1',
    icon: FileMinus,
    type: 'file',
  },
  {
    label: '节点3',
    value: '3',
    icon: FileMinus,
    type: 'file',
  },
]
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger class="h-full">
      <ScrollArea class="h-full">
        <Tree :data="treeData">
          <template #content="{ node }">
            <ContextMenu>
              <ContextMenuTrigger class="flex justify-start items-center gap-2 w-full">
                <component :is="node.icon" class="size-4"/>
                <span class="text-sm select-none">{{ node.label }}</span>
              </ContextMenuTrigger>
              <ContextMenuContent class="w-48">
                <ContextMenuItem inset>
                  新建文件
                </ContextMenuItem>
                <ContextMenuItem inset>
                  新建文件夹
                </ContextMenuItem>
                <ContextMenuSeparator/>
                <ContextMenuItem inset>
                  重命名
                </ContextMenuItem>
                <ContextMenuItem inset>
                  删除
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </template>
        </Tree>
      </ScrollArea>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-48">
      <ContextMenuItem inset>
        新建文件
      </ContextMenuItem>
      <ContextMenuItem inset>
        新建文件夹
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<style scoped>

</style>
