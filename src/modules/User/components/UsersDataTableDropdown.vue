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
