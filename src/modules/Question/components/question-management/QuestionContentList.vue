<template>
  <div class="space-y-4">
    <!-- Empty State -->
    <div
      v-if="!props.data || props.data.length === 0"
      class="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center"
    >
      <Icons.FileQuestion class="text-muted-foreground mb-4 h-12 w-12" />
      <h3 class="mb-2 text-lg font-semibold">Belum Ada Pertanyaan</h3>
      <p class="text-muted-foreground text-sm">Saat ini belum ada pertanyaan yang tersedia</p>
    </div>

    <template v-for="question in props.data" :key="question.id">
      <Card class="group relative overflow-hidden transition-all hover:shadow-md">
        <CardContent>
          <div class="flex items-center gap-4">
            <div class="drag-handle shrink-0 cursor-move pt-1 opacity-40 transition-opacity group-hover:opacity-100">
              <Icons.GripVertical class="text-muted-foreground h-5 w-5" />
            </div>

            <!-- Question Content -->
            <div class="flex-1">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                  <Badge variant="outline" class="text-xs font-medium"> {{ question.display_order }} </Badge>
                  <div class="flex flex-col">
                    <h3 class="text-md font-medium">{{ question.question_text }}</h3>
                    <p class="text-muted-foreground text-xs font-medium">{{ question.category }}</p>
                  </div>
                </div>

                <!-- Action buttons on the right -->
                <div class="ml-4 flex shrink-0 items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button size="icon" variant="ghost" class="cursor-pointer" @click="$emit('detail', question)">
                        <Icons.Eye class="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lihat detail pertanyaan</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button size="icon" variant="ghost" class="cursor-pointer" @click="$emit('edit', question)">
                        <Icons.Edit class="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit pertanyaan</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button size="icon" variant="ghost" class="cursor-pointer" @click="$emit('delete', question)">
                        <Icons.Trash2 class="h-4 w-4 text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hapus pertanyaan</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BaseError } from '@/types';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { Question } from '@/types/question';

interface QuestionContentListProps {
  data?: Question[] | null;
  error?: BaseError | null;
}

const props = defineProps<QuestionContentListProps>();

defineEmits<{
  detail: [question: Question];
  edit: [question: Question];
  delete: [question: Question];
}>();
</script>
