<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup id="handle-demo-group-1" direction="horizontal" class="flex min-h-0 items-stretch">
      <ResizablePanel id="handle-demo-panel-1" :default-size="size[1]" :min-size="size[0]" class="min-h-0">
        <FeedbackList
          :data="props.data"
          :error="props.error"
          v-model:selectedFeedback="selectedFeedback"
          v-model:page="page"
          v-model:limit="limit"
          v-model:is-read="isRead"
        />
      </ResizablePanel>

      <ResizableHandle id="handle-demo-handle-1" with-handle />

      <ResizablePanel id="handle-demo-panel-2" :default-size="size[2]" :min-size="size[0]" class="min-h-0">
        <FeedbackDisplay :feedback="selectedFeedbackData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import FeedbackDisplay from '../components/FeedbackDisplay.vue';
import FeedbackList from '../components/FeedbackList.vue';
import { markFeedbackAsRead } from '../services/feedback';

import type { FeedbackListResponseWithPagination } from '@/types/feedback';

interface FeedbackContentProps {
  data?: FeedbackListResponseWithPagination | null;
  error?: Error | null;
}

const props = defineProps<FeedbackContentProps>();

const page = defineModel<number>('page', { required: true });
const limit = defineModel<number>('limit', { required: true });
const isRead = defineModel<boolean | undefined>('isRead');
const size = [20, 30, 70];

const selectedFeedback = ref<string | undefined>(undefined);

// Find the selected feedback from the feedbacks array
const selectedFeedbackData = computed(() => {
  if (!selectedFeedback.value || !props.data?.feedbacks) {
    return undefined;
  }
  return props.data.feedbacks.find(feedback => feedback.id === selectedFeedback.value);
});

// Mutation to mark feedback as read
const queryClient = useQueryClient();

const { mutate: markAsRead } = useMutation({
  mutationFn: (feedbackId: string) => markFeedbackAsRead(feedbackId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
  },
});

watch(selectedFeedbackData, newFeedback => {
  if (newFeedback && !newFeedback.is_read) {
    markAsRead(newFeedback.id);
  }
});
</script>
