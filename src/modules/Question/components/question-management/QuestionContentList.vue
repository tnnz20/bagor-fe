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

    <!-- Draggable Question Cards -->
    <draggable
      v-else
      v-model="sortedQuestions"
      @end="onDragEnd"
      item-key="id"
      handle=".drag-handle"
      :animation="200"
      class="space-y-3"
    >
      <template #item="{ element: question, index }">
        <Card class="group relative overflow-hidden transition-all hover:shadow-md">
          <CardContent class="p-4">
            <div class="flex items-start gap-4">
              <!-- Drag Handle -->
              <div class="drag-handle shrink-0 cursor-move pt-1 opacity-40 transition-opacity group-hover:opacity-100">
                <Icons.GripVertical class="text-muted-foreground h-5 w-5" />
              </div>

              <!-- Question Content -->
              <div class="flex-1 space-y-3">
                <!-- Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline" class="text-xs"> #{{ index + 1 }} </Badge>
                    <Badge variant="secondary" class="text-xs">
                      {{ question.category }}
                    </Badge>
                    <span class="text-muted-foreground text-xs"> Order: {{ question.display_order }} </span>
                  </div>
                  <div class="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Icons.Edit class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icons.Trash2 class="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <!-- Question Text -->
                <h3 class="text-base leading-relaxed font-semibold">
                  {{ question.question_text }}
                </h3>

                <!-- Choices Dropdown -->
                <div class="pt-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="outline" size="sm" class="w-full justify-between">
                        <span class="flex items-center gap-2">
                          <Icons.List class="h-4 w-4" />
                          Lihat Pilihan Jawaban ({{ question.choices.length }})
                        </span>
                        <Icons.ChevronDown class="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="max-h-[300px] w-[400px] overflow-y-auto" align="start">
                      <DropdownMenuLabel>Pilihan Jawaban</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div class="space-y-1 p-2">
                        <div
                          v-for="(choice, choiceIndex) in question.choices"
                          :key="choice.id"
                          class="hover:bg-accent rounded-md p-3"
                        >
                          <div class="flex items-start gap-3">
                            <div
                              class="border-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium"
                            >
                              {{ String.fromCharCode(65 + choiceIndex) }}
                            </div>
                            <div class="flex-1 space-y-1">
                              <p class="text-sm font-medium">{{ choice.choice_text }}</p>
                              <div class="flex items-center gap-2">
                                <Badge :variant="choice.score > 0 ? 'default' : 'secondary'" class="text-xs">
                                  Score: {{ choice.score }}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { BaseError } from '@/types';
import draggable from 'vuedraggable';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Question } from '@/types/question';

interface QuestionContentListProps {
  data?: Question[] | null;
  error?: BaseError | null;
}

const props = defineProps<QuestionContentListProps>();

const emit = defineEmits<{
  orderChanged: [questions: Question[]];
}>();

// Computed sorted questions
const sortedQuestions = computed({
  get: () => {
    if (!props.data) return [];
    return [...props.data].sort((a, b) => a.display_order - b.display_order);
  },
  set: (newValue: Question[]) => {
    // Update display_order when items are reordered
    for (let index = 0; index < newValue.length; index++) {
      newValue[index].display_order = index + 1;
    }
    emit('orderChanged', newValue);
  },
});

// Methods
const onDragEnd = () => {
  // Emit event when drag ends - the setter already updated the display_order
  console.log(
    'Drag ended. New order:',
    sortedQuestions.value.map(q => ({ id: q.id, order: q.display_order }))
  );
};
</script>
