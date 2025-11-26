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
        <RouterLink :to="`/users/detail/${user.id}`">
          <DropdownMenuItem>
            <Icons.ZoomIn class="mr-2 h-4 w-4" />
            Lihat Detail
          </DropdownMenuItem>
        </RouterLink>
        <DropdownMenuItem @click="isEditDialogOpen = true" class="cursor-pointer">
          <Icons.Edit2 class="mr-2 h-4 w-4" />
          Edit Pengguna
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          :class="cn('text-destructive', 'hover:bg-destructive', 'cursor-pointer')"
          @click="isDeleteDialogOpen = true"
        >
          <Icons.Trash2 class="mr-2 h-4 w-4" />
          Hapus Pengguna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Delete Confirmation Dialog -->
    <UsersDeleteDialog :userId="user.id" :fullName="user.name" v-model:open="isDeleteDialogOpen" />

    <!-- Edit Employee Dialog -->
    <UsersEditEmployeeDialog :userData="transformedUserData" v-model:open="isEditDialogOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { getDepartmentCode } from '@/lib/users';
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
import UsersEditEmployeeDialog from './dialog/UsersEditEmployeeDialog.vue';

import type { EmployeeDetail } from '@/types/employee';
import type { UserTableColumn } from '@/types/user';

const props = defineProps<{
  user: UserTableColumn;
}>();

// Dialog state
const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

// Transform UserTableColumn to UserDetail format for the edit dialog
const transformedUserData = computed(() => {
  const user = props.user;
  const employeeDetail: EmployeeDetail = {
    nip: '',
    employee_type: user.employeeType || '',
    department: (user.department as string) || '',
    department_code: getDepartmentCode(user.department as string) || '',
    position: user.position || '',
    employee_created_at: 0,
    employee_updated_at: 0,
  };

  return {
    id: user.id,
    role: user.role,
    employee_detail: employeeDetail,
  };
});
</script>
