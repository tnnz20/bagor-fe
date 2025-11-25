<template>
  <div class="space-y-4">
    <!-- Main Info Card -->
    <Card>
      <CardHeader>
        <CardTitle>Informasi Utama</CardTitle>
        <CardDescription>Detail informasi akun pengguna</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Avatar and Name Section -->
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar class="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarImage :src="`https://api.dicebear.com/7.x/initials/svg?seed=${userData.profile.full_name}`" />
            <AvatarFallback>{{ getInitials(userData.profile.full_name) }}</AvatarFallback>
          </Avatar>
          <div class="flex-1 space-y-2 text-center sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h2 class="text-xl font-bold sm:text-2xl">{{ userData.profile.full_name }}</h2>
              <Badge :variant="userData.is_active ? 'default' : 'destructive'">
                {{ userData.is_active ? 'Aktif' : 'Nonaktif' }}
              </Badge>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge :variant="getRoleVariant(userData.role)">
                {{ getRoleName(userData.role) }}
              </Badge>
              <Badge variant="outline">
                <Icons.Mail class="mr-1 h-3 w-3" />
                {{ userData.email }}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <!-- Account Details -->
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Username</p>
            <p class="font-medium">{{ userData.username }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Email</p>
            <p class="font-medium">{{ userData.email || '-' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Role</p>
            <p class="font-medium">{{ getRoleName(userData.role) }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Status</p>
            <p class="font-medium">{{ userData.is_active ? 'Aktif' : 'Nonaktif' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Dibuat Pada</p>
            <p class="font-medium">{{ formatDate(userData.created_at) }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Terakhir Diperbarui</p>
            <p class="font-medium">{{ formatDate(userData.updated_at) }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Profile and Employee Details Grid -->
    <div class="grid gap-4 lg:grid-cols-2">
      <!-- Profile Info Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icons.User class="h-5 w-5" />
            Informasi Profil
          </CardTitle>
          <CardDescription>Data pribadi pengguna</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Nama Lengkap</p>
            <p class="font-medium">{{ userData.profile.full_name }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">No. Telepon</p>
            <p class="font-medium">{{ userData.profile.phone || '-' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Jenis Kelamin</p>
            <p class="font-medium">{{ userData.profile.gender || '-' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Tanggal Lahir</p>
            <p class="font-medium">{{ formatDate(userData.profile.birth_date) || '-' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Alamat</p>
            <p class="font-medium">{{ userData.profile.address || '-' }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Employee Info Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icons.Briefcase class="h-5 w-5" />
            Informasi Kepegawaian
          </CardTitle>
          <CardDescription>Data kepegawaian</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">NIP</p>
            <p class="font-medium">{{ userData.employee_detail.nip || '-' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Divisi</p>
            <div class="flex items-center gap-2">
              <Badge variant="secondary">{{ userData.employee_detail.department_code }}</Badge>
              <p class="font-medium">{{ userData.employee_detail.department }}</p>
            </div>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Jabatan</p>
            <p class="font-medium">{{ userData.employee_detail.position }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-muted-foreground text-sm">Jenis Pegawai</p>
            <Badge variant="outline">{{ userData.employee_detail.employee_type }}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoleVariant } from '@/lib/users';
import { getInitials } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import type { UserDetail, UserRole } from '@/types/user';

interface Props {
  userData: UserDetail;
}

defineProps<Props>();

const getRoleName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    admin: 'Admin',
    manager: 'Manager',
    employee: 'Employee',
  };
  return roleNames[role] || role;
};

const formatDate = (timestamp: number): string => {
  if (!timestamp) return '-';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
</script>
