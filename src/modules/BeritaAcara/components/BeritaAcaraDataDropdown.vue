<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="h-8 w-8 p-0">
          <span class="sr-only">Open menu</span>
          <Icons.MoreHorizontal class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="cursor-pointer" @click="handleDownload" :disabled="isDownloading">
          <Icons.Download class="mr-2 h-4 w-4" />
          {{ isDownloading ? 'Mengunduh...' : 'Download' }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          class="text-destructive focus:text-destructive cursor-pointer"
          @click="isDeleteDialogOpen = true"
        >
          <Icons.Trash2 class="mr-2 h-4 w-4" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus berita acara
            <strong>"{{ beritaAcara.title }}"</strong>? Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="isDeleting">Batal</AlertDialogCancel>
          <AlertDialogAction
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            :disabled="isDeleting"
            @click="handleDelete"
          >
            <Icons.Loader2 v-if="isDeleting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { BaseError } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteBeritaAcara, downloadBeritaAcara } from '../services/berita-acara';

import type { BeritaAcara } from '@/types/berita-acara';

const props = defineProps<{
  beritaAcara: BeritaAcara;
}>();

const queryClient = useQueryClient();

// Dialog state
const isDeleteDialogOpen = ref(false);
const isDownloading = ref(false);

// Delete mutation
const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
  mutationFn: () => deleteBeritaAcara(props.beritaAcara.id),
  onSuccess: () => {
    toast.success('Berita acara berhasil dihapus');
    isDeleteDialogOpen.value = false;
    queryClient.invalidateQueries({ queryKey: ['berita-acara'] });
  },
  onError: (error: BaseError) => {
    toast.error(`Gagal menghapus berita acara: ${error.message || 'Terjadi kesalahan'}`);
  },
});

// Handle download
const handleDownload = async () => {
  try {
    isDownloading.value = true;
    const blob = await downloadBeritaAcara(props.beritaAcara.id);

    // Create download link
    const url = globalThis.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = props.beritaAcara.file_name;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    globalThis.URL.revokeObjectURL(url);

    toast.success('File berhasil diunduh');
  } catch (error) {
    const err = error as BaseError;
    toast.error(`Gagal mengunduh file: ${err.message || 'Terjadi kesalahan'}`);
  } finally {
    isDownloading.value = false;
  }
};

// Handle delete
const handleDelete = () => {
  mutateDelete();
};
</script>
