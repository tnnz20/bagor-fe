<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Pengguna</CardTitle>
        <Icons.Users class="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ props.totalUsers }}</div>
        <p class="text-muted-foreground text-xs">+{{ props.newUsersThisMonth }} from last month</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> Pegawai Fungsional</CardTitle>
        <Icons.BookCheck class="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ props.totalUsersWithPositionFungsional }}</div>
        <p class="text-muted-foreground text-xs">
          {{ Math.round((props.totalUsersWithPositionFungsional / props.totalUsers) * 100) }}% of total
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium"> Pegawai Struktural</CardTitle>
        <Icons.Home class="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ props.totalUsersWithPositionStruktural }}</div>
        <p class="text-muted-foreground text-xs">
          {{ Math.round((props.totalUsersWithPositionStruktural / props.totalUsers) * 100) }}% of total
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Pegawai Kontrak</CardTitle>
        <Icons.Timer class="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ props.totalUsersWithPositionKontrak }}</div>
        <p class="text-muted-foreground text-xs">
          {{ Math.round((props.totalUsersWithPositionKontrak / props.totalUsers) * 100) }}% of total
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UsersStatsCardProps {
  totalUsers: number;
  newUsersThisMonth: number;
  totalUsersWithPositionFungsional: number;
  totalUsersWithPositionStruktural: number;
  totalUsersWithPositionKontrak: number;
}

const props = withDefaults(defineProps<UsersStatsCardProps>(), {
  totalUsers: 0,
  newUsersThisMonth: 0,
  totalUsersWithPositionFungsional: 0,
  totalUsersWithPositionStruktural: 0,
  totalUsersWithPositionKontrak: 0,
});
</script>
