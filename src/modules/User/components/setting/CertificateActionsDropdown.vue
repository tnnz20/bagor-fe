<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <Icons.MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleDownload">
        <Icons.Download class="mr-2 h-4 w-4" />
        Unduh
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-destructive" @click="handleDelete">
        <Icons.Trash2 class="mr-2 h-4 w-4" />
        Hapus
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- Delete Dialog -->
  <DeleteCertificateDialog
    v-model:open="isDeleteDialogOpen"
    :certificate-id="certificate.id"
    :certificate-name="certificate.title || certificate.file_name"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { toast } from 'vue-sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { downloadUserCertificate } from '../../services/certificate';
import DeleteCertificateDialog from '../dialog/DeleteCertificateDialog.vue';

import type { Document } from '@/types/document';

interface Props {
  certificate: Document;
}

const props = defineProps<Props>();

const isDeleteDialogOpen = ref(false);

const handleDownload = async () => {
  try {
    const blob = await downloadUserCertificate(props.certificate.id);
    const url = globalThis.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = props.certificate.file_name || 'certificate';

    document.body.appendChild(link);
    link.click();
    link.remove();
    globalThis.URL.revokeObjectURL(url);

    toast.success('Sertifikat berhasil diunduh');
  } catch {
    toast.error('Gagal mengunduh sertifikat');
  }
};

const handleDelete = () => {
  isDeleteDialogOpen.value = true;
};
</script>
