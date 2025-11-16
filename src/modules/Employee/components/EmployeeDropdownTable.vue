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
        <DropdownMenuSeparator />
        <DropdownMenuItem class="cursor-pointer" @click="isPresenceDialogOpen = true">
          Penilaian Kehadiran
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="isAttendanceDialogOpen = true">
          Penilaian Keterlambatan
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="isSurveyDialogOpen = true">
          Penilaian Kinerja
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Penilaian Kehadiran Dialog -->
    <EmployeePresenceDialog v-model:open="isPresenceDialogOpen" :employee="employee" />

    <!-- Penilaian Keterlambatan Dialog -->
    <EmployeeAttendanceDialog v-model:open="isAttendanceDialogOpen" :employee="employee" />

    <!-- Penilaian Kinerja Dialog -->
    <EmployeeSurveyDialog v-model:open="isSurveyDialogOpen" :employee="employee" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
import EmployeeAttendanceDialog from './dialog/EmployeeAttendanceDialog.vue';
import EmployeePresenceDialog from './dialog/EmployeePresenceDialog.vue';

import type { EmployeeTableColumn } from '@/types/employee';

defineProps<{
  employee: EmployeeTableColumn;
}>();

// Dialog states
const isPresenceDialogOpen = ref(false);
const isAttendanceDialogOpen = ref(false);
const isSurveyDialogOpen = ref(false);
</script>
