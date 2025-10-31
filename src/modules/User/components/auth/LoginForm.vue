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
            <div class="relative">
              <Input
                id="password"
                :type="typePassword"
                required
                v-bind="componentField"
                :autocomplete="typePassword === 'password' ? 'current-password' : 'off'"
                class="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                @click="togglePassword"
                class="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                aria-label="Toggle password visibility"
              >
                <Icons.Eye v-if="!showPassword" class="text-muted-foreground h-5 w-5" />
                <Icons.EyeOff v-else class="text-muted-foreground h-5 w-5" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full cursor-pointer"> Login </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as z from 'zod';

import { useAuthStore } from '@/stores/auth';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginUser } from '../../services/auth';

import type { BaseApi } from '@/types/api';

const router = useRouter();
const authStore = useAuthStore();

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
  onSuccess: (data: BaseApi) => {
    toast.success('Login berhasil!');
    console.log('Login successful:', data.code);

    if (data?.code === 200) {
      authStore.setAuthenticated(true);
      router.push('/dashboard');
      return;
    }

    authStore.setAuthenticated(false);
    throw new Error(data?.message || 'Login gagal');
  },
  onError: (err: any) => {
    const errData = err.response?.data || err.message || 'Terjadi kesalahan tak terduga';
    let errMsg = '';

    if (errData.code === 404) {
      errMsg = 'Pengguna tidak ditemukan';
    } else if (errData.code === 400) {
      if (errData.error?.error_description === 'incorrect password') {
        errMsg = 'Password salah';
      } else {
        errMsg = 'Username atau password salah';
      }
    } else {
      errMsg = errData.message || errData;
    }
    toast.error(`Login gagal: ${errMsg}`);
    console.error('Login failed:', err.response?.data?.message || err.message);
  },
});

const onSubmit = LoginForm.handleSubmit(values => {
  loginMutation.mutate(values);
  console.log('Form Values:', values);
});

const showPassword = ref(false);
const typePassword = ref('password');

function togglePassword() {
  showPassword.value = !showPassword.value;
  typePassword.value = showPassword.value ? 'text' : 'password';
}
</script>
