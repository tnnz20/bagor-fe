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
    <UsersDeleteDialog :userId="user.id" :fullName="user.name" v-model:open="isDeleteDialogOpen" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UsersDeleteDialog from './dialog/UsersDeleteDialog.vue';

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
