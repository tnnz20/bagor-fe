<template>
  <form @submit.prevent="onSubmit" class="space-y-4 sm:space-y-6">
    <div class="space-y-3 sm:space-y-4">
      <!-- Current Password -->
      <div class="space-y-1.5 sm:space-y-2">
        <Label for="currentPassword" class="text-xs sm:text-sm">Password Saat Ini</Label>
        <div class="relative">
          <Input
            id="currentPassword"
            v-model="currentPassword"
            :type="showCurrentPassword ? 'text' : 'password'"
            placeholder="Masukkan password saat ini"
            :disabled="isPending"
            class="pr-10 text-sm"
            :class="{ 'border-destructive': errors.currentPassword }"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <Icons.Eye v-if="!showCurrentPassword" class="text-muted-foreground h-4 w-4" />
            <Icons.EyeOff v-else class="text-muted-foreground h-4 w-4" />
          </Button>
        </div>
        <p v-if="errors.currentPassword" class="text-destructive text-xs">{{ errors.currentPassword }}</p>
      </div>

      <!-- New Password -->
      <div class="space-y-1.5 sm:space-y-2">
        <Label for="newPassword" class="text-xs sm:text-sm">Password Baru</Label>
        <div class="relative">
          <Input
            id="newPassword"
            v-model="newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Masukkan password baru"
            :disabled="isPending"
            class="pr-10 text-sm"
            :class="{ 'border-destructive': errors.newPassword }"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
            @click="showNewPassword = !showNewPassword"
          >
            <Icons.Eye v-if="!showNewPassword" class="text-muted-foreground h-4 w-4" />
            <Icons.EyeOff v-else class="text-muted-foreground h-4 w-4" />
          </Button>
        </div>
        <p v-if="errors.newPassword" class="text-destructive text-xs">{{ errors.newPassword }}</p>
      </div>

      <!-- Confirm Password -->
      <div class="space-y-1.5 sm:space-y-2">
        <Label for="confirmPassword" class="text-xs sm:text-sm">Konfirmasi Password Baru</Label>
        <div class="relative">
          <Input
            id="confirmPassword"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Konfirmasi password baru"
            :disabled="isPending"
            class="pr-10 text-sm"
            :class="{ 'border-destructive': errors.confirmPassword }"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <Icons.Eye v-if="!showConfirmPassword" class="text-muted-foreground h-4 w-4" />
            <Icons.EyeOff v-else class="text-muted-foreground h-4 w-4" />
          </Button>
        </div>
        <p v-if="errors.confirmPassword" class="text-destructive text-xs">{{ errors.confirmPassword }}</p>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end pt-2">
      <Button type="submit" size="sm" class="w-full sm:w-auto" :disabled="isPending">
        <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
        {{ isPending ? 'Menyimpan...' : 'Ubah Password' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { BaseError } from '@/types';
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePasswordUser } from '../../services/user';

// Toggle password visibility
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Zod validation schema
const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Password saat ini wajib diisi')
      .min(8, 'Password minimal 8 karakter')
      .max(72, 'Password maksimal 72 karakter'),
    newPassword: z
      .string()
      .min(1, 'Password baru wajib diisi')
      .min(8, 'Password baru minimal 8 karakter')
      .max(72, 'Password baru maksimal 72 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'Password baru harus berbeda dengan password saat ini',
    path: ['newPassword'],
  });

// Initialize form with useForm
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(passwordSchema),
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
});

// Define form fields
const [currentPassword] = defineField('currentPassword');
const [newPassword] = defineField('newPassword');
const [confirmPassword] = defineField('confirmPassword');

// Change password mutation
const { mutate: mutateChangePassword, isPending } = useMutation({
  mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
    changePasswordUser(currentPassword, newPassword),
  onSuccess: () => {
    toast.success('Password berhasil diubah');
    resetForm();
    showCurrentPassword.value = false;
    showNewPassword.value = false;
    showConfirmPassword.value = false;
  },
  onError: (err: BaseError) => {
    toast.error('Gagal mengubah password', {
      description: err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan',
    });
  },
});

// Submit handler with validation
const onSubmit = handleSubmit(
  values => {
    mutateChangePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  },
  ({ errors: validationErrors }) => {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    if (errorMessages.length > 0) {
      toast.error('Validasi Gagal', {
        description: errorMessages.join(', '),
      });
    }
  }
);
</script>
