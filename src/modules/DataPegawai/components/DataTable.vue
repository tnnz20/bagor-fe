<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataMurniDanPelaksana from './DataMurniDanPelaksana.vue';
import DataPegawaiTidakTetap from './DataPegawaiTidakTetap.vue';
import DataPegawasDanPenyetaraan from './DataPegawasDanPenyetaraan.vue';
</script>

<template>
  <Tabs default-value="eselon_iv">
    <TabsList class="my-4 w-fit gap-3">
      <TabsTrigger value="eselon_iv">Jabatan Pengawas (Eselon IV) & JF Penyetaraan</TabsTrigger>
      <TabsTrigger value="jf_murni">JF Murni & Jabatan Pelaksana</TabsTrigger>
      <TabsTrigger value="ptt">Pegawai Tidak Tetap</TabsTrigger>
    </TabsList>
    <TabsContent value="eselon_iv">
      <DataPegawasDanPenyetaraan />
    </TabsContent>
    <TabsContent value="jf_murni">
      <DataMurniDanPelaksana />
    </TabsContent>
    <TabsContent value="ptt">
      <DataPegawaiTidakTetap />
    </TabsContent>
  </Tabs>
</template>

scri
