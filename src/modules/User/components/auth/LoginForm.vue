<template>
  <form @submit="onSubmit" :class="cn('flex flex-col gap-6')">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Login to your account</h1>
      <p class="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
    </div>
    <div class="grid gap-6">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              id="username"
              type="text"
              autocomplete="username"
              placeholder="username"
              required
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input id="password" type="password" required v-bind="componentField" autocomplete="current-password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full"> Login </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginUser } from '../../services/auth';

const authSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: 'Username wajib diisi',
        invalid_type_error: 'Username harus berupa teks',
      })
      .min(3, { message: 'Username minimal 3 karakter' })
      .max(50, { message: 'Username maksimal 50 karakter' }),

    password: z
      .string({
        required_error: 'Password wajib diisi',
        invalid_type_error: 'Password harus berupa teks',
      })
      .min(8, { message: 'Password minimal 8 karakter' })
      .max(200, { message: 'Password maksimal 200 karakter' }),
  })
);

const LoginForm = useForm({
  validationSchema: authSchema,
});

const loginMutation = useMutation({
  mutationFn: loginUser,
  onSuccess: data => {
    console.log('Login success:', data);
    // redirect or set user state
  },
  onError: (err: any) => {
    console.error('Login failed:', err.response?.data?.message || err.message);
  },
});

const onSubmit = LoginForm.handleSubmit(values => {
  loginMutation.mutate(values);
  console.log('Form Values:', values);
});

const showPassword = ref(false);
</script>
