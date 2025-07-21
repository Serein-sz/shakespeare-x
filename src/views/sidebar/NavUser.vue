<script setup lang="ts">
import {BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles,} from 'lucide-vue-next'

import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from '@/components/ui/sidebar'
import {GlowingEffect} from "@/components/ui/glowing-effect";
import type {UserVo} from "@/api/globals";
import {useRequest} from "alova/client";
import Apis from "@/api";
import type {AlovaGenerics} from "alova";
import {useRouter} from "vue-router";

const {isMobile} = useSidebar()
const router = useRouter()

const {data: user} = useRequest<AlovaGenerics<UserVo>, any>(config => Apis.user.get_user_user__get(config), {
  initialData: {
    email: "", id: "", name: "", avatar: ""
  }
})


const logout = async () => {
  localStorage.removeItem('token')
  await router.push('/sign/in')
}


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
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar || ''" :alt="user.name"/>
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4"/>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar || ''" :alt="user.name"/>
                <AvatarFallback class="rounded-lg">
                  CN
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles/>
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck/>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard/>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell/>
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem @click="logout">
            <LogOut/>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
