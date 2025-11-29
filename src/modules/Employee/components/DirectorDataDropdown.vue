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

        <DropdownMenuItem class="cursor-pointer" @click="isNominateShortlistOpen = true">
          <Icons.Check class="mr-2 h-4 w-4" />
          Pilih Sebagai Nominasi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Remove Nomination Dialog -->
    <DirectorNominateDialog v-model:open="isNominateShortlistOpen" :employee="employee" />
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
import DirectorNominateDialog from './dialog/DirectorNominateDialog.vue';

import type { NominationDetail } from '@/types/ranking';

defineProps<{
  employee: NominationDetail;
}>();

const isNominateShortlistOpen = ref(false);
</script>
