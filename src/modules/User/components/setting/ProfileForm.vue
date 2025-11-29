<template>
  <form @submit.prevent="onSubmit" class="space-y-4 sm:space-y-6">
    <!-- Read-only Fields -->
    <div class="space-y-3 sm:space-y-4">
      <div class="space-y-1.5 sm:space-y-2">
        <Label for="fullName" class="text-xs sm:text-sm">Nama Lengkap</Label>
        <Input id="fullName" :model-value="userData?.profile.full_name" disabled class="bg-muted text-sm" />
      </div>

      <div class="space-y-1.5 sm:space-y-2">
        <Label for="email" class="text-xs sm:text-sm">Email</Label>
        <Input id="email" :model-value="userData?.email" disabled class="bg-muted text-sm" />
      </div>

      <div class="space-y-1.5 sm:space-y-2">
        <Label for="username" class="text-xs sm:text-sm">Username</Label>
        <Input id="username" :model-value="userData?.username" disabled class="bg-muted text-sm" />
      </div>
    </div>

    <Separator />

    <!-- Editable Fields -->
    <div class="space-y-3 sm:space-y-4">
      <div class="space-y-1.5 sm:space-y-2">
        <Label for="phone" class="text-xs sm:text-sm">Nomor Telepon</Label>
        <Input
          id="phone"
          v-model="phone"
          type="tel"
          placeholder="Masukkan nomor telepon"
          :disabled="isPending"
          class="text-sm"
          :class="{ 'border-destructive': errors.phone }"
        />
        <p v-if="errors.phone" class="text-destructive text-xs">{{ errors.phone }}</p>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div class="space-y-1.5 sm:space-y-2">
          <Label for="gender" class="text-xs sm:text-sm">Jenis Kelamin</Label>
          <Select v-model="gender" :disabled="isPending">
            <SelectTrigger id="gender" class="text-sm" :class="{ 'border-destructive': errors.gender }">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          <p v-if="errors.gender" class="text-destructive text-xs">{{ errors.gender }}</p>
        </div>

        <div class="space-y-1.5 sm:space-y-2">
          <Label for="birthDate" class="text-xs sm:text-sm">Tanggal Lahir</Label>
          <Popover v-model:open="isCalendarOpen">
            <PopoverTrigger as-child>
              <Button
                id="birthDate"
                variant="outline"
                :class="cn('w-full justify-start text-left text-sm font-normal', !birthDate && 'text-muted-foreground')"
                :disabled="isPending"
              >
                <Icons.Calendar class="mr-2 h-4 w-4" />
                <span class="truncate">{{ birthDate ? formatDisplayDate(birthDate) : 'Pilih tanggal' }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar v-model="birthDate" initial-focus @update:model-value="isCalendarOpen = false" />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div class="space-y-1.5 sm:space-y-2">
        <Label for="address" class="text-xs sm:text-sm">Alamat</Label>
        <Textarea
          id="address"
          v-model="address"
          placeholder="Masukkan alamat lengkap"
          rows="3"
          :disabled="isPending"
          class="sm:rows-4 text-sm"
          :class="{ 'border-destructive': errors.address }"
        />
        <p v-if="errors.address" class="text-destructive text-xs">{{ errors.address }}</p>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end pt-2">
      <Button type="submit" size="sm" class="w-full sm:w-auto" :disabled="isPending || !hasChanges">
        <Icons.Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
        {{ isPending ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { BaseError } from '@/types';
import type { DateValue } from '@internationalized/date';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { DateTime } from 'luxon';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { updateProfileUser } from '../../services/user';

import type { UpdateProfileUserPayload, UserDetail } from '@/types/user';

type Gender = '' | 'male' | 'female';

interface Props {
  userData: UserDetail;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();

// Zod validation schema
const profileSchema = z.object({
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit')
    .regex(/^[0-9+\-\s]+$/, 'Nomor telepon hanya boleh berisi angka, +, -, dan spasi')
    .or(z.literal('')),
  gender: z
    .enum(['male', 'female'], {
      required_error: 'Jenis kelamin harus dipilih',
    })
    .or(z.literal('')),
  address: z.string().min(5, 'Alamat Minimal 5').max(200, 'Alamat maksimal 200 karakter').or(z.literal('')),
});

// Initialize form with useForm
const { errors, handleSubmit, defineField, setValues } = useForm({
  validationSchema: toTypedSchema(profileSchema),
  initialValues: {
    phone: '',
    gender: '' as Gender,
    address: '',
  },
});

// Define form fields
const [phone] = defineField('phone');
const [gender] = defineField('gender');
const [address] = defineField('address');

// Calendar state (handled separately since DateValue is complex)
const birthDate = ref<DateValue>();
const isCalendarOpen = ref(false);

// Original values for comparison
const originalPhone = ref('');
const originalGender = ref<Gender>('');
const originalBirthDate = ref<DateValue>();
const originalAddress = ref('');

// Watch for props changes and populate form
watch(
  () => props.userData,
  userData => {
    if (userData) {
      const phoneValue = userData.profile.phone || '';
      const genderValue = (userData.profile.gender || '') as Gender;
      const addressValue = userData.profile.address || '';

      // Set form values
      setValues({
        phone: phoneValue,
        gender: genderValue,
        address: addressValue,
      });

      // Convert timestamp to CalendarDate
      if (userData.profile.birth_date) {
        const date = DateTime.fromSeconds(userData.profile.birth_date);
        const calendarDate = new CalendarDate(date.year, date.month, date.day);
        birthDate.value = calendarDate;
        originalBirthDate.value = calendarDate;
      }

      // Store original values
      originalPhone.value = phoneValue;
      originalGender.value = genderValue;
      originalAddress.value = addressValue;
    }
  },
  { immediate: true }
);

// Check if form has changes
const hasChanges = computed(() => {
  const phoneChanged = phone.value !== originalPhone.value;
  const genderChanged = gender.value !== originalGender.value;
  const addressChanged = address.value !== originalAddress.value;
  const birthDateChanged = birthDate.value?.toString() !== originalBirthDate.value?.toString();

  return phoneChanged || genderChanged || addressChanged || birthDateChanged;
});

// Date formatter for display
const df = new DateFormatter('id-ID', {
  dateStyle: 'long',
});

// Format date for display
const formatDisplayDate = (date: DateValue): string => {
  return df.format(date.toDate(getLocalTimeZone()));
};

// Update mutation
const { mutate: mutateUpdate, isPending } = useMutation({
  mutationFn: (payload: UpdateProfileUserPayload) => updateProfileUser(payload),
  onSuccess: () => {
    toast.success('Profil berhasil diperbarui');
    queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    queryClient.invalidateQueries({ queryKey: ['user'] });

    // Update original values
    originalPhone.value = phone.value || '';
    originalGender.value = (gender.value || '') as Gender;
    originalAddress.value = address.value || '';
    originalBirthDate.value = birthDate.value;
  },
  onError: (err: BaseError) => {
    toast.error(
      `Gagal memperbarui profil: ${err.response?.data?.error?.error_description || err.message || 'Terjadi kesalahan'}`
    );
  },
});

// Submit handler with validation
const onSubmit = handleSubmit(
  // Success callback - called when validation passes
  values => {
    if (!hasChanges.value) {
      toast.info('Tidak ada perubahan untuk disimpan');
      return;
    }

    // Convert birthDate to timestamp
    let birthTimestamp = 0;
    if (birthDate.value) {
      birthTimestamp = DateTime.fromObject({
        year: birthDate.value.year,
        month: birthDate.value.month,
        day: birthDate.value.day,
      }).toSeconds();
    }

    const payload: UpdateProfileUserPayload = {
      phone: values.phone || '',
      gender: values.gender || '',
      address: values.address || '',
      birth_date: birthTimestamp,
    };

    mutateUpdate(payload);
  },
  // Error callback - called when validation fails
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
