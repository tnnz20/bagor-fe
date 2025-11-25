<template>
  <form @submit="onSubmit" :class="cn('flex flex-col gap-6')">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Masuk ke akun anda</h1>
      <p class="text-muted-foreground text-sm text-balance">
        Masukan username dan password pengguna untuk masuk ke akun anda
      </p>
    </div>
    <div class="grid gap-6">
      <!-- Username Field -->
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input id="username" v-model="username" type="text" autocomplete="username" placeholder="username" />
        <p v-if="errors.username" class="text-destructive text-sm">{{ errors.username }}</p>
      </div>

      <!-- Password Field -->
      <div class="space-y-2">
        <Label for="password">Password</Label>
        <div class="relative">
          <Input
            id="password"
            v-model="password"
            :type="typePassword"
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
        <p v-if="errors.password" class="text-destructive text-sm">{{ errors.password }}</p>
      </div>

      <Button type="submit" class="w-full cursor-pointer" :disabled="loginMutation.isPending.value">
        {{ loginMutation.isPending.value ? 'Loading...' : 'Login' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import type { AxiosError } from 'axios';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as z from 'zod';

import { useAuthStore } from '@/stores/auth';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginUser } from '../../services/auth';

import type { BaseApi, BaseError, ErrorResponse } from '@/types/index';

const router = useRouter();
const authStore = useAuthStore();

// Password visibility toggle
const showPassword = ref(false);
const typePassword = ref('password');

function togglePassword() {
  showPassword.value = !showPassword.value;
  typePassword.value = showPassword.value ? 'text' : 'password';
}

// Zod validation schema
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

// Initialize form with useForm
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: authSchema,
});

// Define form fields with v-model binding
const [username] = defineField('username');
const [password] = defineField('password');

// Login mutation
const loginMutation = useMutation({
  mutationFn: LoginUser,
  onSuccess: async (data: BaseApi) => {
    if (data?.code === 200) {
      toast.success('Login berhasil!');
      authStore.setAuthenticated(true);

      router.push('/dashboard');
      return;
    }

    authStore.setAuthenticated(false);
    throw new Error(data?.message || 'Login gagal');
  },
  onError: (err: BaseError) => {
    const errRes = err.response?.data;
    let errMsg = '';
    if (errRes?.code === 404) {
      errMsg = 'Pengguna tidak ditemukan';
    } else if (errRes?.code === 400) {
      if (errRes?.error?.error_description === 'incorrect password') {
        errMsg = 'Password salah';
      } else {
        errMsg = 'Username atau password salah';
      }
    } else {
      errMsg = 'Terjadi kesalahan pada server';
    }
    toast.error(`Login gagal: ${errMsg}`);
    console.error('Login failed:', errMsg || errRes?.error?.error_description);
  },
});

// Form submission handler
const onSubmit = handleSubmit(values => {
  loginMutation.mutate(values);
});
</script>
