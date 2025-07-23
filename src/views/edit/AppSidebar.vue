<script setup lang="ts">
import {AudioWaveform, Command, GalleryVerticalEnd, Search} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  type SidebarProps,
  SidebarRail
} from '@/components/ui/sidebar'
import {Label} from '@/components/ui/label'
import NavUser from '@/views/home/NavUser.vue'
import TeamSwitcher from '@/components/WorkspaceSwitcher.vue'
import FileTree from "@/views/edit/FileTree.vue";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {

  workspaces: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :workspaces="data.workspaces"/>
      <SidebarGroup class="py-0">
        <SidebarGroupContent class="relative">
          <Label for="search" class="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            class="pl-8"
          />
          <Search
            class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"/>
        </SidebarGroupContent>
      </SidebarGroup>
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
