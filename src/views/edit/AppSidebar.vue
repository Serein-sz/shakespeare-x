<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import NavUser from '@/views/home/NavUser.vue'
import TeamSwitcher from '@/components/WorkspaceSwitcher.vue'
import FileTree from "@/views/edit/FileTree.vue";
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <TeamSwitcher/>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup class="h-full">
        <SidebarGroupLabel>
          Files
        </SidebarGroupLabel>
        <SidebarGroupContent class="h-full">
          <FileTree/>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser/>
    </SidebarFooter>
    <SidebarRail/>
  </Sidebar>
</template>
