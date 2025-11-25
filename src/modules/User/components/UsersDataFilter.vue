<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="ml-auto" :disabled="loading">
        Filter Data
        <Icons.ChevronDown class="ml-2 h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="leading-none font-medium">Filter Data</h4>
          <p class="text-muted-foreground text-sm">Saring pengguna berdasarkan kriteria.</p>
        </div>

        <!-- Sort -->
        <div class="grid gap-2">
          <Label for="sortOrder">Urutkan Berdasarkan Nama</Label>
          <Select v-model="filters.sort_order">
            <SelectTrigger class="h-9">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">A-Z</SelectItem>
              <SelectItem value="DESC">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Department -->
        <div class="grid gap-2">
          <Label for="department">Divisi</Label>
          <Select v-model="filters.department">
            <SelectTrigger class="h-9">
              <SelectValue placeholder="Semua Divisi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Divisi</SelectItem>
              <SelectSeparator />
              <SelectItem v-for="division in divisions" :key="division.value" :value="division.value">
                {{ division.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Employee Type -->
        <div class="grid gap-2">
          <Label for="employeTypee">Jenis Pegawai</Label>
          <Select v-model="filters.employeeType">
            <SelectTrigger class="h-9">
              <SelectValue placeholder="Semua Jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenis</SelectItem>
              <SelectSeparator />
              <SelectItem v-for="type in employeeTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Role -->
        <div class="grid gap-2">
          <Label for="role">Role</Label>
          <Select v-model="filters.role">
            <SelectTrigger class="h-9">
              <SelectValue placeholder="Semua Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Role</SelectItem>
              <SelectSeparator />
              <SelectItem v-for="role in roles" :key="role.value" :value="role.value">
                {{ role.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="mt-2 flex justify-end">
          <Button variant="outline" size="sm" class="cursor-pointer text-xs" @click="handleReset">
            Reset Filter
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { divisions, employeeTypes, roles } from '@/constants';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { FilterUsers } from '@/types/user';

interface FilterProps {
  loading: boolean;
}

defineProps<FilterProps>();

const filters = defineModel<FilterUsers>('filters', { required: true });

const handleReset = () => {
  filters.value.department = 'all';
  filters.value.employeeType = 'all';
  filters.value.role = 'all';
  filters.value.sort_order = 'ASC';
};
</script>
