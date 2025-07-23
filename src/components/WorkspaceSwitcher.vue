<script setup lang="ts">
import {ChevronsUpDown, GalleryVerticalEnd} from 'lucide-vue-next'

import {type Component, ref} from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from '@/components/ui/sidebar'
import {GlowingEffect} from "@/components/ui/glowing-effect";

const workspaces = [
  {
    name: 'Document',
    logo: GalleryVerticalEnd,
    plan: 'Free',
  },
]

const {isMobile} = useSidebar()
const activeWorkspace = ref(workspaces[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <GlowingEffect
              :spread="40"
              :glow="true"
              :disabled="false"
              :proximity="64"
              :inactive-zone="0.01"
            />
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <component :is="activeWorkspace.logo" class="size-4"/>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                {{ activeWorkspace.name }}
              </span>
              <span class="truncate text-xs">{{ activeWorkspace.plan }}</span>
            </div>
            <ChevronsUpDown class="ml-auto"/>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Workspaces
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(workspace) in workspaces"
            :key="workspace.name"
            class="gap-2 p-2"
            @click="activeWorkspace = workspace"
          >
            <div class="flex size-6 items-center justify-center rounded-sm border">
              <component :is="workspace.logo" class="size-3.5 shrink-0"/>
            </div>
            {{ workspace.name }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
