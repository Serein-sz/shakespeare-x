<script setup lang="ts">
import {Toaster} from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import {useColorMode} from "@vueuse/core"; // vue-sonner v2 requires this import


useColorMode().value = "dark"
</script>

<template>
  <Toaster/>
  <RouterView class="min-h-screen min-w-screen"/>
</template>

<style scoped>

</style>
