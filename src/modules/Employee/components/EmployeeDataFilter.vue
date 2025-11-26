<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="ml-auto">
        Filter Data
        <Icons.ChevronDown class="ml-2 h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="leading-none font-medium">Filter Data</h4>
          <p class="text-muted-foreground text-sm">Saring pegawai berdasarkan berbagai kriteria.</p>
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="sortOrder">Urutkan Nama</Label>
          <Select v-model="filters.sort_order" defaultValue="ASC">
            <SelectTrigger class="col-span-2 h-8">
              <SelectValue placeholder="Dari A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">Dari A-Z</SelectItem>
              <SelectItem value="DESC">Dari Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-4">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="department">Divisi</Label>
            <Select v-model="filters.department" defaultValue="all" class="w-full">
              <SelectTrigger class="col-span-2 h-auto">
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                <SelectSeparator />
                <template v-for="division in divisions" :key="division.value">
                  <SelectItem :value="division.value">{{ division.label }}</SelectItem>
                </template>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="employeeType">Jenis Pegawai</Label>
            <Select v-model="filters.employeeType" defaultValue="all">
              <SelectTrigger class="col-span-2 h-8">
                <SelectValue placeholder="Semua Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectSeparator />
                <template v-for="type in employeeTypes" :key="type.value">
                  <SelectItem :value="type.value">{{ type.label }}</SelectItem>
                </template>
              </SelectContent>
            </Select>
          </div>

          <div class="mt-4 flex items-center justify-end">
            <Button class="cursor-pointer" @click="handleReset">Reset Filter</Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { divisions, employeeTypes } from '@/constants';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { FilterEmployees } from '@/types/employee';

interface FilterProps {
  loading: boolean;
}

defineProps<FilterProps>();

const filters = defineModel<FilterEmployees>('filters', { required: true });

const handleReset = () => {
  filters.value.department = 'all';
  filters.value.employeeType = 'all';
  filters.value.sort_order = 'ASC';
};
</script>
