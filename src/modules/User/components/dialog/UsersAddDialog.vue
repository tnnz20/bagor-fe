<template>
  <Dialog v-model:open="AddDialogModel">
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Tambah Pengguna Baru</DialogTitle>
        <DialogDescription>
          Isi formulir di bawah ini untuk menambahkan pengguna baru. Klik simpan setelah selesai.
        </DialogDescription>
      </DialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-2 gap-4">
          <!-- Username -->
          <div class="space-y-2">
            <Label for="username">Username</Label>
            <Input id="username" v-model="username" type="text" placeholder="johndoe" />
            <p v-if="errors.username" class="text-destructive text-sm">{{ errors.username }}</p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="user@example.com" />
            <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Full Name -->
        <div class="space-y-2">
          <Label for="full_name">Nama Lengkap</Label>
          <Input id="full_name" v-model="fullName" type="text" placeholder="John Doe" />
          <p v-if="errors.full_name" class="text-destructive text-sm">{{ errors.full_name }}</p>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="Minimal 8 karakter" />
          <p v-if="errors.password" class="text-destructive text-sm">{{ errors.password }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Role -->
          <div class="space-y-2">
            <Label for="role">Role</Label>
            <Select v-model="roleValue">
              <SelectTrigger id="role">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="role in roles" :key="role.value" :value="role.value">
                  {{ role.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.role" class="text-destructive text-sm">{{ errors.role }}</p>
          </div>

          <!-- Department -->
          <div class="space-y-2">
            <Label for="department">Divisi</Label>
            <Select v-model="departmentValue">
              <SelectTrigger id="department">
                <SelectValue placeholder="Pilih divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="division in divisions" :key="division.value" :value="division.value">
                  {{ division.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.department" class="text-destructive text-sm">{{ errors.department }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Position -->
          <div class="space-y-2">
            <Label for="position">Jabatan</Label>
            <Input id="position" v-model="position" type="text" placeholder="Manager, Staff, dll" />
            <p v-if="errors.position" class="text-destructive text-sm">{{ errors.position }}</p>
          </div>

          <!-- Employee Type -->
          <div class="space-y-2">
            <Label for="employee_type">Jenis Pegawai</Label>
            <Select v-model="employeeTypeValue">
              <SelectTrigger id="employee_type">
                <SelectValue placeholder="Pilih jenis pegawai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="type in employeeTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.employee_type" class="text-destructive text-sm">{{ errors.employee_type }}</p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="AddDialogModel = false"> Batal </Button>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Menyimpan...' : 'Simpan Pengguna' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { divisions, employeeTypes, roles } from '@/constants';
import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createUser } from '../../services/user';

import type { UserRegistration } from '@/types/user';

const AddDialogModel = defineModel<boolean>('modelValue');
const queryClient = useQueryClient();

// Zod validation schema
const formSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(20, 'Username maksimal 20 karakter'),
  email: z.string().email('Email tidak valid').optional(),
  password: z.string().min(8, 'Password minimal 8 karakter').max(72, 'Password maksimal 72 karakter'),
  role: z.enum(['admin', 'manager', 'employee'], {
    required_error: 'Role harus dipilih',
  }),
  full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter').max(100, 'Nama lengkap maksimal 100 karakter'),
  department: z.string().min(1, 'Divisi harus dipilih'),
  position: z.string().min(3, 'Jabatan minimal 3 karakter').max(100, 'Jabatan maksimal 100 karakter'),
  employee_type: z.enum(['Pengawas dan Penyetaraan', 'Murni dan Pelaksana', 'PTT', 'Struktural'], {
    required_error: 'Jenis pegawai harus dipilih',
  }),
});

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

// Define form fields with v-model binding
const [username] = defineField('username');
const [email] = defineField('email');
const [password] = defineField('password');
const [fullName] = defineField('full_name');
const [position] = defineField('position');

// Select fields
const [roleValue] = defineField('role');
const [departmentValue] = defineField('department');
const [employeeTypeValue] = defineField('employee_type');

// Mutation for creating user
const { mutate: createUserMutation, isPending } = useMutation({
  mutationFn: (userData: UserRegistration) => createUser(userData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('Berhasil!', {
      description: 'Pengguna baru berhasil ditambahkan.',
    });
    resetForm();
    AddDialogModel.value = false;
  },
  onError: (err: BaseError) => {
    console.error('Failed to create user:', err);
    const errRes = err.response?.data;
    const errorMessage = errRes?.error?.error_description || 'Terjadi kesalahan saat menambahkan pengguna.';
    toast.error('Gagal Menambahkan Pengguna', {
      description: errorMessage,
    });
  },
});

// Reset form when dialog closes
watch(AddDialogModel, isOpen => {
  if (!isOpen) {
    resetForm();
  }
});

// Form submission handler
const onSubmit = handleSubmit(values => {
  const userData: UserRegistration = {
    username: values.username,
    email: values.email,
    password: values.password,
    full_name: values.full_name,
    role: values.role,
    position: values.position,
    department_code: values.department,
    employee_type: values.employee_type,
  };

  createUserMutation(userData);
});
</script>
