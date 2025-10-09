<template>
  <Card>
    <CardHeader>
      <CardTitle>Bantu Kami Menjadi Lebih Baik</CardTitle>
      <CardDescription>
        Bagaimana pengalaman Anda menggunakan sistem ini? Kami ingin mendengar langsung dari Anda agar kami bisa
        memberikan layanan yang lebih baik lagi.</CardDescription
      >
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="area">Kategori Saran</Label>
          <Select default-value="masukan" id="area">
            <SelectTrigger id="area" class="w-full">
              <SelectValue placeholder="Kategori Saran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tampilan & Desain"> Tampilan & Desain </SelectItem>
              <SelectItem value="Fitur & Fungsi"> Fitur & Fungsi </SelectItem>
              <SelectItem value="Konten & Informasi"> Konten & Informasi </SelectItem>
              <SelectItem value="Kinerja & Performa"> Kinerja & Performa </SelectItem>
              <SelectItem value="Keamanan & Privasi"> Keamanan & Privasi </SelectItem>
              <SelectItem value="Saran Umum"> Saran Umum </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="subjek">Subjek</Label>
        <Input id="subjek" placeholder="Saran saya..." />
      </div>
      <div class="grid gap-2">
        <Label for="description">Deskripsi</Label>
        <Textarea
          id="description"
          placeholder="Silakan sertakan semua informasi yang relevan dengan masalah Anda."
          class="h-[100px]"
        />
      </div>
    </CardContent>
    <CardFooter class="flex justify-end pr-6">
      <Button>Kirim</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
</script>
