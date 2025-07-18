<script setup lang="ts">
import {GalleryVerticalEnd, Loader2} from 'lucide-vue-next'
import {cn} from '@/lib/utils.ts'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useRouter} from "vue-router";
import {Card, CardAction, CardContent, CardFooter} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import Apis from "@/api";
import {useRequest} from "alova/client";
import {Sparkles} from "@/components/ui/sparkles";

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  email: z.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  password: z.string().min(6).max(50),
}))

const form = useForm({validationSchema: formSchema})

const {
  loading,
  send,
} = useRequest(config => Apis.auth.login_auth_login_post(config), {immediate: false});

const onSubmit = form.handleSubmit(
  async (values) => {
    await send({data: values});
    await router.push('/edit')
  },
  (event) => {
    console.error('event: ', event)
  }
)


</script>

<template>
  <div class="flex min-h-svh flex items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div class="w-full max-w-sm">
      <Card :class="cn('flex flex-col gap-6')">
        <CardContent>
          <form @submit="onSubmit">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col items-center gap-2">
                <a
                  href="#"
                  class="flex flex-col items-center gap-2 font-medium"
                >
                  <div class="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd class="size-6"/>
                  </div>
                  <span class="sr-only">Shakespeare X.</span>
                </a>
                <h1 class="text-xl font-bold">
                  Welcome to Shakespeare X.
                </h1>
                <div class="text-center text-sm">
                  Don't have an account?
                  <span class="cursor-pointer underline"
                        @click="() => router.push('/sign/up')">
                    Sign up
                  </span>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <div class="grid gap-3">
                  <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
                <div class="grid gap-3">
                  <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          required
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
                <CardAction class="w-full">
                  <Button type="submit" class="w-full">
                    <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin"/>
                    Login
                  </Button>
                </CardAction>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div
            class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
