<script lang="ts" setup>
import { computed, ref } from 'vue';

import { refDebounced } from '@vueuse/core';
import { Search } from 'lucide-vue-next';

import { cn } from '@/lib/utils';

import Input from '@/components/ui/input/Input.vue';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { Feedback } from '../data/feedbacks';
import FeedbackDisplay from './FeedbackDisplay.vue';
import FeedbackList from './FeedbackList.vue';

interface FeedbackProps {
  accounts: {
    label: string;
    email: string;
    icon: string;
  }[];
  feedbacks: Feedback[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const props = withDefaults(defineProps<FeedbackProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
});

const selectedFeedback = ref<string | undefined>(props.feedbacks[0].id);
const searchValue = ref('');
const debouncedSearch = refDebounced(searchValue, 250);

const filteredFeedbackList = computed(() => {
  let output: Feedback[] = [];
  const searchValue = debouncedSearch.value?.trim();
  if (!searchValue) {
    output = props.feedbacks;
  } else {
    output = props.feedbacks.filter(item => {
      return (
        item.name.includes(debouncedSearch.value) ||
        item.email.includes(debouncedSearch.value) ||
        item.name.includes(debouncedSearch.value) ||
        item.subject.includes(debouncedSearch.value) ||
        item.text.includes(debouncedSearch.value)
      );
    });
  }

  return output;
});

const unreadFeedbackList = computed(() =>
  filteredFeedbackList.value.filter(item => !item.read)
);

const selectedFeedbackData = computed(() =>
  props.feedbacks.find(item => item.id === selectedFeedback.value)
);
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        id="resize-panel-2"
        :default-size="defaultLayout[1]"
        :min-size="30"
      >
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">Inbox</h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
                All mail
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                class="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div
            class="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur"
          >
            <form>
              <div class="relative">
                <Search
                  class="text-muted-foreground absolute top-2.5 left-2 size-4"
                />
                <Input
                  v-model="searchValue"
                  placeholder="Search"
                  class="pl-8"
                />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <FeedbackList
              v-model:selected-mail="selectedFeedback"
              :items="filteredFeedbackList"
            />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <FeedbackList
              v-model:selected-mail="selectedFeedback"
              :items="unreadFeedbackList"
            />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
        <FeedbackDisplay :mail="selectedFeedbackData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
