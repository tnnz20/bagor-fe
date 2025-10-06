<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kelola Pengguna</h1>
        <p class="text-muted-foreground">Kelola akun pengguna bagor</p>
      </div>
      <Button>
        <Icons.UserRoundPlus class="mr-2 h-4 w-4" />
        Tambah Pengguna
      </Button>
    </div>

    <!-- Stats Cards -->
    <UsersStatsCard
      :total-users="totalUsers"
      :total-users-with-position-fungsional="fungsionalUsers"
      :total-users-with-position-struktural="strukturalUsers"
      :total-users-with-position-kontrak="kontrakUsers"
      :new-users-this-month="newUsersThisMonth"
    />

    <!-- Users Table -->
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pengguna</CardTitle>
        <CardDescription> Daftar seluruh pengguna dalam sistem beserta peran dan status mereka </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersDataTable :users="users" @edit-user="handleEditUser" @delete-user="handleDeleteUser" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersDataTable from '../components/UsersDataTable.vue';
import UsersStatsCard from '../components/UsersStatsCard.vue';
// Sample data with realistic Indonesian government departments

import Users from '../data/users';

import type { User, UserForm } from '@/types/user';

// Form states
const showUserForm = ref(false);
const isEditMode = ref(false);

// Form data
const userForm = ref<UserForm>({
  firstName: '',
  lastName: '',
  email: '',
  role: 'employee',
  department: 'UMUM DAN KEUANGAN',
  position: '',
  employeeType: 'Fungsional',
  isActive: true,
});

const users = ref<User[]>(Users);

const currentEditingUser = ref<User | null>(null);

// Computed statistics
const totalUsers = computed(() => users.value.length);
const fungsionalUsers = computed(() => users.value.filter(u => u.employeeType === 'Fungsional').length);
const strukturalUsers = computed(() => users.value.filter(u => u.employeeType === 'Struktural').length);
const kontrakUsers = computed(() => users.value.filter(u => u.employeeType === 'Kontrak').length);
const newUsersThisMonth = computed(() => {
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return users.value.filter(u => u.created_at > oneMonthAgo).length;
});

const handleEditUser = (user: User) => {
  isEditMode.value = true;
  currentEditingUser.value = user;
  userForm.value = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    department: user.department,
    position: user.position || '',
    employeeType: user.employeeType || 'Fungsional',
    isActive: user.isActive,
  };
  showUserForm.value = true;
};

const handleDeleteUser = (user: User) => {
  if (confirm(`Apakah Anda yakin ingin menghapus ${user.firstName} ${user.lastName}?`)) {
    const index = users.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        deleted_at: Date.now(),
        isActive: false,
      };
    }
  }
};
</script>
