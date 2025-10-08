<template>
  <Card class="mt-4">
    <CardHeader>
      <CardTitle class="text-lg">Informasi Kuis</CardTitle>
    </CardHeader>
    <CardContent class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span>Total Soal:</span>
        <span class="font-medium">{{ sortedQuestionsLength }}</span>
      </div>
      <div class="flex justify-between">
        <span>Sudah Dijawab:</span>
        <span class="font-medium">{{ answeredQuestionsLength }}</span>
      </div>
      <div class="flex justify-between">
        <span>Sisa Soal:</span>
        <span class="font-medium">{{ sortedQuestionsLength - answeredQuestionsLength }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionInfoProps {
  sortedQuestionsLength: number;
  answeredQuestionsLength: number;
}

const { sortedQuestionsLength, answeredQuestionsLength } = defineProps<QuestionInfoProps>();
</script>
