<template>
  <Tabs :default-value="tabsValue" @update:model-value="handleValue" class="flex h-dvh min-h-0 flex-col">
    <div class="flex items-center px-4 py-2">
      <h1 class="text-xl font-bold">Kritik & Saran</h1>
      <TabsList class="ml-auto">
        <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200"> Semua </TabsTrigger>
        <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200"> Belum dibaca </TabsTrigger>
      </TabsList>
    </div>
    <Separator />
    <div class="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
      <form>
        <div class="relative">
          <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
            <Icons.Search class="text-muted-foreground size-4" />
          </span>
          <Input placeholder="Cari nama pengirim" class="pr-8 pl-8" v-model="searchValue" />

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
      <!-- Empty State (404 or no data) -->
      <div
        v-if="
          props.error?.response?.status === 404 || (!props.error && (!data?.feedbacks || data.feedbacks.length === 0))
        "
        class="flex h-full w-full flex-col items-center justify-center p-8 text-center"
      >
        <h3 class="mb-2 text-lg font-semibold">Belum Ada Kritik & Saran</h3>
        <p class="text-muted-foreground text-sm">Saat ini belum ada kritik dan saran yang tersedia untuk ditampilkan</p>
      </div>
      <!-- Content -->
      <FeedbackListContent v-else :feedbacks="data?.feedbacks" v-model:selectedFeedback="selectedFeedback" />
    </TabsContent>
    <TabsContent value="unread" class="m-0 min-h-0 flex-1">
      <!-- Empty State (404 or no data) -->
      <div
        v-if="
          props.error?.response?.status === 404 || (!props.error && (!data?.feedbacks || data.feedbacks.length === 0))
        "
        class="flex h-full w-full flex-col items-center justify-center p-8 text-center"
      >
        <p class="text-muted-foreground text-sm">Tidak ada kritik dan saran yang belum dibaca</p>
      </div>
      <!-- Content -->
      <FeedbackListContent v-else :feedbacks="data?.feedbacks" v-model:selectedFeedback="selectedFeedback" />
    </TabsContent>

    <!-- Pagination -->
    <div v-if="!props.error && data?.feedbacks && data.feedbacks.length > 0">
      <Separator />
      <div class="flex items-center justify-between px-4 py-2">
        <div class="text-muted-foreground text-sm">
          <span v-if="data?.total_rows">
            {{ (data?.page - 1) * data?.limit + 1 }}-{{ Math.min(data.page * data.limit, data.total_rows || 0) }} dari
            {{ data.total_rows || 0 }} saran
          </span>
        </div>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            class="cursor-pointer"
            size="sm"
            :disabled="!data || data.page <= 1"
            @click="page = (data?.page || 1) - 1"
          >
            <Icons.ChevronLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="cursor-pointer"
            size="sm"
            :disabled="!data || data.page >= (data.total_pages || 1)"
            @click="page = (data?.page || 1) + 1"
          >
            <Icons.ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { BaseError } from '@/types';
import { refDebounced } from '@vueuse/core';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackListContent from './FeedbackListContent.vue';

import type { FeedbackListResponseWithPagination } from '@/types/feedback';

interface FeedbackListProps {
  data?: FeedbackListResponseWithPagination | null;
  error?: BaseError | null;
}

const route = useRoute();
const router = useRouter();
const props = defineProps<FeedbackListProps>();

const tabsValue = ref((route.query.tabs as string) || 'all');

const page = defineModel<number>('page', { required: true });
const limit = defineModel<number>('limit', { required: true });
const isRead = defineModel<boolean | undefined>('isRead');

const searchValue = ref('');
const debouncedSearch = refDebounced(searchValue, 250);

const handleValue = (value: string | number) => {
  if (value === 'all') {
    router.push({ query: { ...route.query, tabs: 'all' } });
    isRead.value = undefined; // Show all feedbacks (no is_read filter)
    page.value = 1;
  } else if (value === 'unread') {
    router.push({ query: { ...route.query, tabs: 'unread' } });
    isRead.value = false; // Show only unread feedbacks (is_read = false)
    page.value = 1;
  }
};

const selectedFeedback = defineModel<string>('selectedFeedback', {
  required: false,
});
</script>
