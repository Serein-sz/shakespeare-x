<script setup lang="ts">
import AppSidebar from '@/views/edit/AppSidebar.vue'
import {SidebarInset, SidebarProvider,} from '@/components/ui/sidebar'
</script>
<template>
  <div class="w-full h-screen flex justify-center bg-[#1A1A1A]">
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset class="flex flex-row w-full h-full">
        <RouterView />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
