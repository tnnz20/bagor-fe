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

        <DropdownMenuItem class="cursor-pointer" @click="isDeleteNominateDialogOpen = true">
          <Icons.X class="mr-2 h-4 w-4" />
          Hapus Nominasi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Remove Nomination Dialog -->
    <SelectionDeleteNominateDialog v-model:open="isDeleteNominateDialogOpen" :employee="employee" :type="type" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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
import SelectionDeleteNominateDialog from './dialog/SelectionDeleteNominateDialog.vue';

import type { NominationDetail } from '@/types/ranking';

defineProps<{
  employee: NominationDetail;
}>();

const userStore = useUserStore();
const userRole = userStore.userRole;
const isDeleteNominateDialogOpen = ref(false);

const type = computed(() => {
  if (userRole === 'director') {
    return 'shortlist';
  } else {
    return 'nomination';
  }
});
</script>
