<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-end p-3">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" :disabled="!feedback">
            <Icons.Trash2 class="size-5" />
            <span class="sr-only">Hapus Feedback</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Hapus Feedback</TooltipContent>
      </Tooltip>
    </div>
    <Separator />

    <!-- Feedback Content -->
    <div v-if="feedback" class="flex flex-1 flex-col overflow-auto">
      <!-- Header: Avatar and Sender Info -->
      <div class="flex items-start gap-4 p-4">
        <Avatar class="h-12 w-12">
          <AvatarFallback class="text-lg">
            {{ feedbackFallbackName }}
          </AvatarFallback>
        </Avatar>
        <div class="flex-1 space-y-1">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ feedback.sender_name }}</h3>
            <Badge v-if="!feedback.is_read" variant="default" class="bg-blue-600"> Belum Dibaca </Badge>
            <Badge v-else variant="secondary"> Sudah Dibaca </Badge>
          </div>
          <div class="text-muted-foreground flex items-center gap-2 text-xs">
            <span>{{ DateTime.fromSeconds(feedback.created_at).toLocaleString(DateTime.DATETIME_MED) }}</span>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Subject and Category -->
      <div class="space-y-3 p-4">
        <div>
          <p class="text-muted-foreground text-xs font-medium uppercase">Kategori</p>
          <div class="mt-1 font-semibold">
            {{ feedback.category }}
          </div>
        </div>

        <div>
          <p class="text-muted-foreground text-xs font-medium uppercase">Subjek</p>
          <h2 class="mt-1 text-base font-semibold">{{ feedback.subject }}</h2>
        </div>
      </div>

      <Separator />

      <!-- Message Content -->
      <div class="flex-1 p-4">
        <p class="text-muted-foreground text-xs font-medium uppercase">Pesan</p>
        <div class="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
          {{ feedback.message }}
        </div>
      </div>

      <Separator />
    </div>

    <!-- Empty State -->
    <div v-else class="flex h-full flex-col items-center justify-center p-8 text-center">
      <Icons.MessageSquareDot class="text-muted-foreground mb-4 h-16 w-16" />
      <h3 class="mb-2 text-lg font-semibold">Tidak ada kritik dan saran yang dipilih</h3>
      <p class="text-muted-foreground text-sm">Pilih salah satu kritik dan saran dari daftar untuk melihat detailnya</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { DateTime } from 'luxon';

import { getInitials } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { Feedback } from '@/types/feedback';

interface FeedbackDisplayProps {
  feedback?: Feedback;
}

const props = defineProps<FeedbackDisplayProps>();

const feedbackFallbackName = computed(() => {
  return getInitials(props.feedback?.sender_name || '');
});
</script>
