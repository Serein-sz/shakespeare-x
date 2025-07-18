<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {useRouter} from "vue-router";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Apis from "@/api";
import {useRequest} from "alova/client";
import {Loader2} from "lucide-vue-next";
import {GlowingEffect} from "@/components/ui/glowing-effect";

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  password: z.string().min(6).max(50),
}))

const form = useForm({validationSchema: formSchema})

const {
  loading,
  send,
} = useRequest(config => Apis.auth.register_auth_register_post(config), {immediate: false});

const onSubmit = form.handleSubmit(
  async (values) => {
    await send({data: values});
    await router.push('/sign/in')
  },
  (event) => {
    console.error('event: ', event)
  }
)
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div class="w-full max-w-sm">
      <Card class="mx-auto max-w-sm relative">
        <GlowingEffect
          :spread="40"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
        />
        <CardHeader>
          <CardTitle class="text-xl">
            Sign Up
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="onSubmit">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="name">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        required
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
              </div>
              <div class="grid gap-2">
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
              <div class="grid gap-2">
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
              <Button type="submit" class="w-full">
                <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin"/>
                Create an account
              </Button>
            </div>
          </form>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <span class="cursor-pointer underline" @click="() => router.push('/sign/in')">
              Sign in
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

</template>
