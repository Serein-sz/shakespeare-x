<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Tree from "@/components/ui/tree/Tree.vue";
import type {TreeNode} from "@/components/ui/tree";
import {FileMinus, Folder} from "lucide-vue-next";
import {useRequest} from "alova/client";
import type {AlovaGenerics} from "alova";
import type {FileTreeCreate, FileTreeVo} from "@/api/globals";
import Apis from "@/api";

import {ref} from "vue";
import {useDocumentStore} from "@/stores/document.ts";
import {GlowBorder} from "@/components/ui/glow-border";
import {NeonBorder} from "@/components/ui/neon-border";


const {data: treeData, send: getFiles} = useRequest<AlovaGenerics<FileTreeVo[]>, any>(
  config => Apis.file.get_file_file__get(config),
  {
    initialData: [],
  }
);

const getIcon = (node: TreeNode) => {
  if (node.type === 'folder') {
    return Folder;
  }
  return FileMinus;
}

const visibleCreateFile = ref(false);

const {send: createFileSend} = useRequest(config => Apis.file.create_file_file__post(config), {immediate: false});

const file = ref<FileTreeCreate>({
  name: "", type: "folder", user_id: ""
});

const openCreateFileDialog = (id: string | undefined, type: FileTreeCreate["type"] = "folder") => {
  file.value.parent_id = id;
  file.value.type = type;
  visibleCreateFile.value = true;
}

const createFile = async () => {
  await createFileSend({
    data: file.value
  });
  file.value.parent_id = "";
  file.value.name = "";
  visibleCreateFile.value = false;
  await getFiles();
}

const visibleDeleteFile = ref(false);
const pendingDeleteFileId = ref("");

const openDeleteFileAlert = (id: string) => {
  pendingDeleteFileId.value = id;
  visibleDeleteFile.value = true;
}
const closeDeleteFileAlert = () => {
  pendingDeleteFileId.value = "";
  visibleDeleteFile.value = false;
}

const deleteFile = async () => {
  await Apis.file.delete_file_file__delete({params: {id: pendingDeleteFileId.value}});
  await getFiles();
  closeDeleteFileAlert()
}

const store = useDocumentStore()

const editDocument = (node: TreeNode) => {
  if (node.type === "folder") {
    return;
  }
  store.init(node.id);
}

</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger class="h-full">
      <ScrollArea class="h-full">
        <Tree :data="treeData">
          <template #content="{ node }">
            <GlowBorder
              v-if="node.id === store.id"
              :color="['#A07CFE', '#FE8FB5', '#FFBE7B']"
              :border-radius="10"
            />
            <ContextMenu>
              <ContextMenuTrigger class="flex justify-start items-center gap-2 w-full"
                                  @dblclick="() => editDocument(node)">
                <component :is="getIcon(node)" class="size-4"/>
                <span class="text-sm select-none">{{ node.name }}</span>
              </ContextMenuTrigger>
              <ContextMenuContent class="w-48">
                <ContextMenuItem inset @click="() => openCreateFileDialog(node.id, 'file')">
                  New file
                </ContextMenuItem>
                <ContextMenuItem inset @click="() => openCreateFileDialog(node.id, 'folder')">
                  New folder
                </ContextMenuItem>
                <ContextMenuSeparator/>
                <ContextMenuItem inset>
                  Rename
                </ContextMenuItem>
                <ContextMenuItem inset @click="() => openDeleteFileAlert(node.id)">
                  Remove
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </template>
        </Tree>
      </ScrollArea>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-48">
      <ContextMenuItem inset @click="() => openCreateFileDialog('', 'file')">
        New file
      </ContextMenuItem>
      <ContextMenuItem inset @click="() => openCreateFileDialog('', 'folder')">
        New folder
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
  <Dialog v-model:open="visibleCreateFile">
    <DialogContent>
      <DialogTitle>Create File</DialogTitle>
      <DialogDescription></DialogDescription>
      <div class="flex items-center gap-4">
        <Label for="filename" class="text-right">
          Name:
        </Label>
        <Input id="filename" v-model="file.name"/>
      </div>
      <DialogFooter>
        <Button @click="createFile">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <AlertDialog v-model:open="visibleDeleteFile">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeDeleteFileAlert">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteFile">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped>

</style>
