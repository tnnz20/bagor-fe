<template>
  <Tabs default-value="all" class="flex h-full min-h-0 flex-col">
    <div class="flex items-center px-4 py-2">
      <h1 class="text-xl font-bold">Kritik & Saran</h1>
      <TabsList class="ml-auto">
        <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
          Semua
        </TabsTrigger>
        <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
          Belum dibaca
        </TabsTrigger>
      </TabsList>
    </div>
    <Separator />
    <div
      class="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur"
    >
      <form>
        <div class="relative">
          <span
            class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
          >
            <Icons.Search class="text-muted-foreground size-4" />
          </span>
          <Input
            placeholder="Cari nama pengirim"
            class="pr-8 pl-8"
            v-model="searchValue"
          />

          <button
            v-if="searchValue"
            type="button"
            class="text-muted-foreground hover:text-foreground absolute inset-y-0 end-0 flex items-center justify-center px-2"
            @click="searchValue = ''"
          >
            <Icons.X class="size-4" />
          </button>
        </div>
      </form>
    </div>

    <!-- scroll area lives here -->
    <TabsContent value="all" class="m-0 min-h-0 flex-1">
      <FeedbackListContent
        :feedbacks="filteredFeedbackList"
        v-model:selectedFeedback="selectedFeedback"
      />
    </TabsContent>
    <TabsContent value="unread" class="m-0 min-h-0 flex-1">
      <FeedbackListContent
        :feedbacks="unreadFeedbackList"
        v-model:selectedFeedback="selectedFeedback"
      />
    </TabsContent>
  </Tabs>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { refDebounced } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Feedback } from '../types';
import FeedbackListContent from './FeedbackListContent.vue';

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const props = withDefaults(defineProps<FeedbackListProps>(), {
  feedbacks: () => [],
});

const searchValue = ref('');
const debouncedSearch = refDebounced(searchValue, 250);
const selectedFeedback = defineModel<string>('selectedFeedback', {
  required: false,
});

const filteredFeedbackList = computed(() => {
  let output: Feedback[] = [];
  const searchValue = debouncedSearch.value?.trim();
  if (!searchValue) {
    output = props.feedbacks;
  } else {
    output = props.feedbacks.filter(item => {
      return item.name.toLowerCase().includes(debouncedSearch.value);
    });
  }

  return output;
});

const unreadFeedbackList = computed(() => {
  return filteredFeedbackList.value.filter(item => !item.read);
});
</script>
