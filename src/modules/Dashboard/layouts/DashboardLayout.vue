<template>
  <Toaster position="top-right" richColors />
  <!-- Success State - Show Dashboard -->
  <SidebarProvider v-if="isSuccess">
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader />
      <RouterView />
    </SidebarInset>
  </SidebarProvider>

  <!-- Loading State -->
  <div v-else-if="isLoading" class="flex h-screen w-full items-center justify-center">
    <div class="flex flex-col items-center gap-2">
      <Icons.Loader2 class="text-primary h-16 w-16 animate-spin" />
      <p class="text-muted-foreground">Memuat data...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="isError" class="flex h-screen w-full flex-col items-center justify-center space-y-4">
    <Icons.AlertCircle class="text-destructive h-16 w-16" />
    <div class="text-center">
      <h2 class="text-xl font-semibold">Gagal Memuat Data</h2>
      <p class="text-muted-foreground mt-2">
        {{ (error as any)?.response?.data?.message || error?.message || 'Terjadi kesalahan' }}
      </p>
    </div>
    <Button @click="refetch" variant="outline">
      <Icons.RefreshCcw class="mr-2 h-4 w-4" />
      Coba Lagi
    </Button>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useQuery } from '@tanstack/vue-query';
import { toast, Toaster } from 'vue-sonner';

import { getUser } from '@/modules/User/services/user';
import { useAuthStore } from '@/stores/auth';

import { getRoleDefaultRoute } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../components/AppSidebar.vue';
import DashboardHeader from '../components/DashboardHeader.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
  queryKey: ['user'], // ✅ Consistent key for caching
  queryFn: getUser,
  retry: 2,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});

// Handler extracted to reduce cognitive complexity
const handleUserResponse = (response: any) => {
  if (!response || response.code !== 200 || !response.data) return;

  const userData = response.data;
  const currentPath = route.path;
  const userRole = userData.Role;

  // If user is on /dashboard root, redirect based on role
  if (currentPath === '/dashboard') {
    const defaultRoute = getRoleDefaultRoute(userRole);
    if (userRole !== 'admin') {
      router.replace(defaultRoute);
      return;
    }
  }

  // If user is on a specific page, check if they have access
  if (route.meta.roles) {
    const requiredRoles = route.meta.roles as string[];
    if (!requiredRoles.includes(userRole)) {
      const defaultRoute = getRoleDefaultRoute(userRole);
      router.replace(defaultRoute);
      toast.error('Anda tidak memiliki akses ke halaman tersebut');
    }
  }
};

watch(data, val => handleUserResponse(val), { immediate: true });

watch(isError, hasError => {
  if (hasError) {
    console.error('Failed to fetch user profile:', error.value);

    const status = (error.value as any)?.response?.status;

    // If 401 Unauthorized, logout and redirect to login
    if (status === 401) {
      toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
      authStore.logout();
      router.push('/login');
    } else {
      // Other errors - just show error message
      toast.error('Gagal memuat data pengguna');
    }
  }
});
</script>
