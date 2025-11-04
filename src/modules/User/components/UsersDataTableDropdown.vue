<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="h-8 w-8 p-0">
          <span class="sr-only">Open menu</span>
          <Icons.MoreHorizontal class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuItem>
          <Icons.ZoomIn class="mr-2 h-4 w-4" />
          <RouterLink :to="`/employees/${user.id}`"> Lihat Detail</RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem @click="openDialog('edit')">
          <Icons.Edit class="mr-2 h-4 w-4" />
          Edit Detail
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          :class="cn('text-destructive', 'hover:bg-destructive', 'cursor-pointer')"
          @click="openDialog('delete')"
        >
          <Icons.Trash2 class="mr-2 h-4 w-4" />
          Hapus Pengguna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Edit Dialog -->
    <Dialog v-model:open="isEditDialogOpen">
      <DialogContent class="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Detail Pengguna</DialogTitle>
          <DialogDescription>
            Buat perubahan pada profil pengguna di sini. Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <form class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="lastName">Nama Lengkap</Label>
              <Input id="lastName" v-model="formData.name" placeholder="Nama belakang" />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="formData.email" type="email" placeholder="email@example.com" />
          </div>
          <div class="space-y-2">
            <Label for="position">Posisi</Label>
            <Select v-model="formData.position">
              <SelectTrigger>
                <SelectValue placeholder="Pilih posisi jabatan" />
              </SelectTrigger>
              <SelectContent>
                <!-- Structural Positions -->
                <SelectItem value="Kepala Bagian Umum dan Keuangan">Kepala Bagian Umum dan Keuangan</SelectItem>
                <SelectItem value="Kepala Sub Bagian Perlengkapan">Kepala Sub Bagian Perlengkapan</SelectItem>
                <SelectItem value="Kepala Sub Bagian Pemerintahan">Kepala Sub Bagian Pemerintahan</SelectItem>
                <SelectItem value="Bendahara Pengeluaran">Bendahara Pengeluaran</SelectItem>

                <!-- Functional Positions -->
                <SelectItem value="Analis Organisasi dan Tata Laksana">Analis Organisasi dan Tata Laksana</SelectItem>
                <SelectItem value="Analis Hukum">Analis Hukum</SelectItem>
                <SelectItem value="Analis Kebijakan">Analis Kebijakan</SelectItem>
                <SelectItem value="Analis Kesejahteraan Sosial">Analis Kesejahteraan Sosial</SelectItem>
                <SelectItem value="Pranata Humas">Pranata Humas</SelectItem>
                <SelectItem value="Pejabat Pengadaan">Pejabat Pengadaan</SelectItem>

                <!-- Additional Common Positions -->
                <SelectItem value="Staff Administrasi">Staff Administrasi</SelectItem>
                <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                <SelectItem value="Operator Komputer">Operator Komputer</SelectItem>
                <SelectItem value="Arsiparis">Arsiparis</SelectItem>
                <SelectItem value="Pengawas Internal">Pengawas Internal</SelectItem>
                <SelectItem value="Koordinator Program">Koordinator Program</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" @click="closeDialog('edit')"> Batal </Button>
          <Button type="submit"> Simpan Perubahan </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent class="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Pengguna</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus pengguna <strong>{{ user.name }}</strong
            >? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <div class="bg-destructive/10 flex items-center space-x-2 rounded-lg p-4">
          <Icons.AlertTriangle class="text-destructive h-5 w-5" />
          <span class="text-destructive text-sm"> Data pengguna akan dihapus secara permanen dari sistem. </span>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="closeDialog('delete')"> Batal </Button>
          <Button type="button" variant="destructive"> Hapus Pengguna </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { UserTableColumn } from '@/types/user';

const props = defineProps<{
  user: UserTableColumn;
}>();

// Dialog state
const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

// Form data for editing
const formData = reactive({
  name: '',
  email: '',
  position: '',
});

// Initialize form data when user prop changes
const initializeFormData = () => {
  formData.name = props.user.name;
  formData.position = props.user.position || '';
};

// Watch for user prop changes
watch(() => props.user, initializeFormData, { immediate: true });

// Edit dialog methods
const openDialog = (eventName: string) => {
  if (eventName === 'edit') {
    isEditDialogOpen.value = true;
  } else if (eventName === 'delete') {
    isDeleteDialogOpen.value = true;
  }
};

const closeDialog = (eventName: string) => {
  if (eventName === 'edit') {
    isEditDialogOpen.value = false;
  } else if (eventName === 'delete') {
    isDeleteDialogOpen.value = false;
  }
};
</script>
