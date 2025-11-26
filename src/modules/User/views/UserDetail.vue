<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Detail Pengguna</h1>
        <p class="text-muted-foreground text-sm">Informasi lengkap pengguna</p>
      </div>

      <!-- Action Buttons -->
      <div v-if="!isLoading && data?.data" class="flex gap-2">
        <!-- Back Button -->
        <Button variant="outline" size="sm" @click="router.back()" class="cursor-pointer">
          <Icons.ArrowLeft class="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <!-- Actions Dropdown -->
        <DropdownMenu v-if="userRole === 'admin'">
          <DropdownMenuTrigger as-child>
            <Button size="sm" class="gap flex cursor-pointer items-center">
              <p class="m-1">Aksi</p>
              <Icons.ChevronDown class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
            <DropdownMenuItem @click="isEditEmployeeDialogOpen = true">
              <Icons.Edit2 class="mr-2 h-4 w-4" />
              Edit Kepegawaian
            </DropdownMenuItem>
            <DropdownMenuItem
              @click="isStatusDialogOpen = true"
              :class="data.data.is_active ? 'text-destructive focus:text-destructive' : ''"
            >
              <Icons.Shield class="mr-2 h-4 w-4" />
              {{ data.data.is_active ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna' }}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="isDeleteDialogOpen = true" class="text-destructive focus:text-destructive">
              <Icons.Trash2 class="mr-2 h-4 w-4" />
              Hapus Pengguna
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton class="h-6 w-48" />
          <Skeleton class="h-4 w-64" />
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Skeleton class="h-24 w-24 rounded-full" />
            <div class="flex-1 space-y-3 text-center sm:text-left">
              <Skeleton class="mx-auto h-6 w-48 sm:mx-0" />
              <Skeleton class="mx-auto h-4 w-32 sm:mx-0" />
            </div>
          </div>
          <Separator />
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="i in 6" :key="i" class="space-y-2">
              <Skeleton class="h-4 w-24" />
              <Skeleton class="h-5 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="grid gap-4 md:grid-cols-2">
        <Card v-for="i in 2" :key="i">
          <CardHeader>
            <Skeleton class="h-5 w-32" />
          </CardHeader>
          <CardContent class="space-y-3">
            <div v-for="j in 4" :key="j" class="space-y-2">
              <Skeleton class="h-4 w-28" />
              <Skeleton class="h-5 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Error State -->
    <Card v-else-if="isError" class="border-destructive">
      <CardContent class="flex flex-col items-center justify-center py-12">
        <Icons.AlertCircle class="text-destructive mb-4 h-16 w-16" />
        <h2 class="mb-2 text-xl font-semibold">Gagal Memuat Data</h2>
        <p class="text-muted-foreground mb-4 text-center">{{ errorMessage }}</p>
        <Button @click="router.back()" variant="outline">
          <Icons.ArrowLeft class="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </CardContent>
    </Card>

    <!-- Content -->
    <UserCard v-if="data?.data" :userData="data.data" />

    <!-- Edit Employee Dialog -->
    <UsersEditEmployeeDialog
      v-if="data?.data"
      v-model:open="isEditEmployeeDialogOpen"
      :userData="transformedUserData"
    />

    <!-- Status Confirmation Dialog -->
    <UsersStatusDialog v-if="data?.data" v-model:open="isStatusDialogOpen" :user="data.data" />

    <!-- Delete Confirmation Dialog -->
    <UsersDeleteDialog
      v-if="data?.data"
      v-model:open="isDeleteDialogOpen"
      :user-id="data.data.id"
      :full-name="data.data.profile.full_name"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { BaseError } from '@/types';
import { useQuery } from '@tanstack/vue-query';

import { useUserStore } from '@/stores/user';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Separator from '@/components/ui/separator/Separator.vue';
import { Skeleton } from '@/components/ui/skeleton';
import UsersDeleteDialog from '../components/dialog/UsersDeleteDialog.vue';
import UsersEditEmployeeDialog from '../components/dialog/UsersEditEmployeeDialog.vue';
import UsersStatusDialog from '../components/dialog/UsersStatusDialog.vue';
import UserCard from '../components/user/UserCard.vue';
import { getUserDetailById } from '../services/user';

import type { EmployeeDetail } from '@/types/employee';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userRole = userStore.userRole;

const id = ref<string>((route.params.id as string) || '');

// Dialog states
const isEditEmployeeDialogOpen = ref(false);
const isStatusDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['user-detail', id],
  queryFn: () => getUserDetailById(id.value),
});

const errorMessage = computed(() => {
  if (!error.value) return '';

  const err = error.value as BaseError;
  const messages: Record<string, string> = {
    404: 'Pengguna tidak ditemukan.',
    400: 'Permintaan tidak valid. Silahkan periksa kembali.',
    500: 'Server error. Silahkan coba lagi nanti.',
  };

  const errorCode = err?.response?.data?.code;
  return (errorCode ? messages[errorCode] : undefined) || err.message || 'Terjadi kesalahan pada server.';
});

// Transform user data for edit dialog
const transformedUserData = computed(() => {
  if (!data.value?.data) return undefined;

  const userData = data.value.data;
  const employeeDetail: EmployeeDetail = {
    nip: userData.employee_detail.nip || '',
    employee_type: userData.employee_detail.employee_type,
    department: userData.employee_detail.department,
    department_code: userData.employee_detail.department_code,
    position: userData.employee_detail.position,
    employee_created_at: userData.employee_detail.employee_created_at || 0,
    employee_updated_at: userData.employee_detail.employee_updated_at || 0,
  };

  return {
    id: userData.id,
    role: userData.role,
    employee_detail: employeeDetail,
  };
});
</script>
