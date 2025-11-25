<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Edit Data Karyawan</DialogTitle>
        <DialogDescription> Perbarui informasi detail karyawan. Klik simpan setelah selesai. </DialogDescription>
      </DialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <!-- NIP (Optional) -->
        <div class="space-y-2">
          <Label for="nip">NIP (Opsional)</Label>
          <Input id="nip" v-model="nip" type="text" placeholder="Masukkan NIP" />
          <p v-if="errors.nip" class="text-destructive text-sm">{{ errors.nip }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
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
            <p v-if="errors.department_code" class="text-destructive text-sm">{{ errors.department_code }}</p>
          </div>

          <!-- Employee Type -->
          <div class="space-y-2">
            <Label for="employee_type">Jenis Pegawai</Label>
            <Select v-model="employeeTypeValue">
              <SelectTrigger id="employee_type">
                <SelectValue placeholder="Pilih jenis pegawai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="type in filteredEmployeeTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.employee_type" class="text-destructive text-sm">{{ errors.employee_type }}</p>
          </div>
        </div>

        <!-- Position -->
        <div class="space-y-2">
          <Label for="position">Jabatan</Label>
          <Input id="position" v-model="position" type="text" placeholder="Manager, Staff, dll" />
          <p v-if="errors.position" class="text-destructive text-sm">{{ errors.position }}</p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="isOpen = false"> Batal </Button>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

import { divisions, employeeTypes } from '@/constants';
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
import { updateUserEmployeeDetail } from '../../services/user';

import type { EmployeeDetail, EmployeeType } from '@/types/employee';
import type { UserRole } from '@/types/user';

interface UserData {
  id: string;
  role: UserRole;
  employee_detail: EmployeeDetail;
}

interface Props {
  userData?: UserData;
}

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('open', { default: false });

const queryClient = useQueryClient();

// Filter employee types based on role
// If role is 'manager', only show 'Struktural'
const filteredEmployeeTypes = computed(() => {
  if (props.userData?.role === 'manager') {
    return employeeTypes.filter(type => type.value === 'Struktural');
  }
  return employeeTypes;
});

// Zod validation schema
const formSchema = z.object({
  nip: z.string().optional(),
  department_code: z.string().min(1, 'Divisi harus dipilih'),
  position: z.string().min(3, 'Jabatan minimal 3 karakter').max(100, 'Jabatan maksimal 100 karakter'),
  employee_type: z.enum(['Pengawas dan Penyetaraan', 'Murni dan Pelaksana', 'PTT', 'Struktural'], {
    required_error: 'Jenis pegawai harus dipilih',
  }),
});

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

// Define form fields with v-model binding
const [nip] = defineField('nip');
const [position] = defineField('position');

// Select fields
const [departmentValue] = defineField('department_code');
const [employeeTypeValue] = defineField('employee_type');

// Mutation for updating user employee detail
const { mutate: updateUserMutation, isPending } = useMutation({
  mutationFn: (payload: { userId: string; data: Partial<EmployeeDetail> }) =>
    updateUserEmployeeDetail(payload.userId, payload.data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('Berhasil!', {
      description: 'Data karyawan berhasil diperbarui.',
    });
    isOpen.value = false;
  },
  onError: (err: BaseError) => {
    console.error('Failed to update user employee detail:', err);
    const errRes = err.response?.data;
    const errorMessage = errRes?.error?.error_description || 'Terjadi kesalahan saat memperbarui data karyawan.';
    toast.error('Gagal Memperbarui Data', {
      description: errorMessage,
    });
  },
});

// Watch for dialog open and populate form with current data
watch(isOpen, dialogOpen => {
  if (dialogOpen && props.userData?.employee_detail) {
    const employeeData = props.userData.employee_detail;
    const userRole = props.userData.role;

    // If role is manager, force employee_type to be 'Struktural'
    const employeeType = userRole === 'manager' ? 'Struktural' : employeeData.employee_type;

    setValues({
      nip: employeeData.nip || '',
      department_code: employeeData.department_code,
      position: employeeData.position,
      employee_type: employeeType as EmployeeType,
    });
  } else if (!dialogOpen) {
    resetForm();
  }
});

// Form submission handler
const onSubmit = handleSubmit(values => {
  if (!props.userData?.id) {
    toast.error('Error', {
      description: 'User ID tidak ditemukan.',
    });
    return;
  }

  const payload: Partial<EmployeeDetail> = {
    department_code: values.department_code,
    position: values.position,
    employee_type: values.employee_type,
  };

  // Only include nip if it's provided
  if (values.nip && values.nip.trim() !== '') {
    payload.nip = values.nip.trim();
  }

  updateUserMutation({
    userId: props.userData.id,
    data: payload,
  });
});
</script>
