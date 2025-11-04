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
    <div v-if="feedback" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ feedbackFallbackName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ feedback.name }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ feedback.email }}
            </div>
          </div>
        </div>
        <div v-if="feedback.created_at" class="text-muted-foreground ml-auto text-xs">
          <!-- {{ format(new Date(feedback.created_at), 'PP') }} -->
        </div>
      </div>
      <Separator />
      <div class="flex-1 p-4 text-sm whitespace-pre-wrap">
        {{ feedback.message }}
      </div>
    </div>
    <div v-else class="text-muted-foreground p-8 text-center">Tidak ada kritik dan saran yang dipilih!</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Feedback } from '../types';

const feedbackFallbackName = computed(() => {
  return props.feedback?.name
    .split(' ')
    .map(chunk => chunk[0])
    .join('');
});

interface FeedbackDisplayProps {
  feedback: Feedback | undefined;
}

const props = withDefaults(defineProps<FeedbackDisplayProps>(), {
  feedback: undefined,
});
</script>
