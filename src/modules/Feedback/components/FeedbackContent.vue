<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class="flex h-full min-h-0 items-stretch"
    >
      <ResizablePanel
        id="handle-demo-panel-1"
        :default-size="size[1]"
        :min-size="size[0]"
        class="h-full min-h-0"
      >
        <FeedbackList
          :feedbacks="props.feedbacks"
          v-model:selectedFeedback="selectedFeedback"
        />
      </ResizablePanel>

      <ResizableHandle id="handle-demo-handle-1" with-handle />

      <ResizablePanel
        id="handle-demo-panel-2"
        :default-size="size[2]"
        :min-size="size[0]"
        class="h-full min-h-0"
      >
        <FeedbackDisplay :feedback="selectedFeedbackData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import FeedbackDisplay from '../components/FeedbackDisplay.vue';
import FeedbackList from '../components/FeedbackList.vue';
import type { Feedback } from '../types';

interface FeedbackContentProps {
  feedbacks: Feedback[];
}

const props = withDefaults(defineProps<FeedbackContentProps>(), {
  feedbacks: () => [],
});

const size = [20, 30, 70];

const selectedFeedback = ref<string | undefined>(undefined);

const selectedFeedbackData = computed(() =>
  props.feedbacks.find(item => item.id === selectedFeedback.value)
);
</script>
