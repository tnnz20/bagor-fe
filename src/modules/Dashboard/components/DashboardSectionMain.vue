<template>
  <div class="grid grid-cols-5 gap-6">
    <Card class="col-span-3 rounded-xl p-6 shadow">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-xl font-medium">Pegawai Terbaik</CardTitle>
      </CardHeader>
      <CardContent class="p-6">
        <div class="flex items-end justify-center space-x-8">
          <!-- 2nd Place -->
          <div class="flex flex-col items-center space-y-3">
            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 ring-2 ring-slate-200">
                <svg class="h-8 w-8 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-foreground text-sm font-medium">Sarah Johnson</p>
              <div
                class="mt-1 inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800"
              >
                9.8
              </div>
            </div>
            <div class="relative">
              <div class="h-16 w-16 rounded-t-lg bg-gradient-to-t from-orange-400 to-orange-300 shadow-sm"></div>
              <div
                class="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-slate-400 text-xs font-bold text-white"
              >
                2
              </div>
            </div>
          </div>

          <!-- 1st Place -->
          <div class="flex flex-col items-center space-y-3">
            <div class="relative">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 ring-2 ring-yellow-200">
                <svg class="h-10 w-10 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <div class="absolute -top-2 left-1/2 -translate-x-1/2">
                <svg class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-foreground text-sm font-semibold">Ahmad Rahman</p>
              <div
                class="mt-1 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-800"
              >
                10.0
              </div>
            </div>
            <div class="relative">
              <div class="h-24 w-16 rounded-t-lg bg-gradient-to-t from-yellow-400 to-yellow-300 shadow-sm"></div>
              <div
                class="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white"
              >
                1
              </div>
            </div>
          </div>

          <!-- 3rd Place -->
          <div class="flex flex-col items-center space-y-3">
            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 ring-2 ring-slate-200">
                <svg class="h-8 w-8 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-foreground text-sm font-medium">Maya Sari</p>
              <div
                class="mt-1 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"
              >
                9.0
              </div>
            </div>
            <div class="relative">
              <div class="h-12 w-16 rounded-t-lg bg-gradient-to-t from-amber-400 to-amber-300 shadow-sm"></div>
              <div
                class="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white"
              >
                3
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card class="col-span-2 rounded-xl p-6 shadow">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-xl font-medium">Data Nilai Pegawai</CardTitle>
      </CardHeader>
      <CardContent class="p-6"> Table </CardContent>
      <CardFooter>
        <Button variant="outline">
          <RouterLink to="/dashboard/employees" class="text-foreground flex items-center gap-2 text-sm font-medium">
            Lihat Seluruh Pegawai
            <Icons.ChevronRight />
          </RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
</script>
