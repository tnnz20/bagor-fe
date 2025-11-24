<template>
  <ScrollArea class="h-full min-h-0 overflow-auto">
    <div class="flex min-h-0 w-full flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" appear tag="div" class="flex flex-col gap-2">
        <button
          v-for="feedback of feedbacks"
          :key="feedback.id"
          :class="
            cn(
              'hover:bg-accent flex w-full cursor-pointer flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all',
              selectedFeedback === feedback.id && 'bg-muted'
            )
          "
          @click="selectedFeedback = feedback.id"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ feedback.sender_name }}
                </div>
                <span v-if="!feedback.is_read" class="flex h-2 w-2 rounded-full bg-blue-600" />
              </div>

              <div
                :class="
                  cn('ml-auto text-xs', selectedFeedback === feedback.id ? 'text-foreground' : 'text-muted-foreground')
                "
              >
                {{ DateTime.fromSeconds(feedback.created_at).toRelative() }}
              </div>
            </div>

            <div class="text-xs font-medium">
              {{ feedback.subject }}
            </div>
            <div class="text-muted-foreground line-clamp-2 text-xs">
              {{ feedback.message.substring(0, 300) }}
            </div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';

import type { Feedback } from '@/types/feedback';

interface FeedbackListContentProps {
  feedbacks?: Feedback[] | null;
}

defineProps<FeedbackListContentProps>();

const selectedFeedback = defineModel<string>('selectedFeedback', {
  required: false,
});
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
