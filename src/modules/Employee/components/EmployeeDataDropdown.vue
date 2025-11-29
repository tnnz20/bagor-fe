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
        <RouterLink :to="`/users/detail/${employee.user_id}`">
          <DropdownMenuItem>
            <Icons.ZoomIn class="mr-2 h-4 w-4" />
            Lihat Detail
          </DropdownMenuItem>
        </RouterLink>
        <DropdownMenuItem class="cursor-pointer" @click="isPresenceDialogOpen = true" v-if="userRole === 'admin'">
          <Icons.UserCheck class="mr-2 h-4 w-4" />
          Penilaian Kehadiran
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="isAttendanceDialogOpen = true" v-if="userRole === 'admin'">
          <Icons.Clock class="mr-2 h-4 w-4" />
          Penilaian Keterlambatan
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="isNominateDialogOpen = true" v-if="userRole === 'manager'">
          <Icons.Check class="mr-2 h-4 w-4" />
          Pilih Sebagai Nominasi
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="isSurveyDialogOpen = true">
          <Icons.ClipboardCheck class="mr-2 h-4 w-4" />
          Penilaian Kinerja
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Penilaian Kehadiran Dialog -->
    <EmployeePresenceDialog v-model:open="isPresenceDialogOpen" :employee="employee" />

    <!-- Penilaian Keterlambatan Dialog -->
    <EmployeeAttendanceDialog v-model:open="isAttendanceDialogOpen" :employee="employee" />

    <!-- Nominate Employee -->
    <EmployeeNominateDialog v-model:open="isNominateDialogOpen" :employee="employee" />

    <!-- Penilaian Kinerja Dialog -->
    <EmployeeSurveyDialog v-model:open="isSurveyDialogOpen" :employee="employee" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';

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
import EmployeeNominateDialog from './dialog/EmployeeNominateDialog.vue';
import EmployeePresenceDialog from './dialog/EmployeePresenceDialog.vue';
import EmployeeSurveyDialog from './dialog/EmployeeSurveyDialog.vue';

import type { EmployeeScore } from '@/types/employee';

defineProps<{
  employee: EmployeeScore;
}>();

const userStore = useUserStore();

const userRole = userStore.userRole;

// Dialog states
const isPresenceDialogOpen = ref(false);
const isAttendanceDialogOpen = ref(false);
const isSurveyDialogOpen = ref(false);
const isNominateDialogOpen = ref(false);
</script>
