import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';
import { DateTime } from 'luxon';

import { formatFileSize } from '@/lib/utils';

import { Icons } from '@/components/icons';
import CertificateActionsDropdown from '../components/setting/CertificateActionsDropdown.vue';

import type { Document } from '@/types/document';

export const CertificateColumns: ColumnDef<Document>[] = [
  {
    accessorKey: 'title',
    header: 'Nama Sertifikat',
    cell: ({ row }) => {
      const cert = row.original;
      return h('div', { class: 'flex items-center gap-2' }, [
        h(Icons.FileText, { class: 'h-4 w-4 text-muted-foreground shrink-0' }),
        h('span', { class: 'font-medium text-sm truncate' }, cert.title || cert.file_name),
      ]);
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => {
      const description = row.getValue('description');
      return h(
        'div',
        { class: 'text-sm text-muted-foreground truncate max-w-[200px]' },
        (description as string) || '-'
      );
    },
  },
  {
    accessorKey: 'size',
    header: 'Ukuran',
    cell: ({ row }) => {
      const size = row.getValue('size');
      return h('div', { class: 'text-sm text-muted-foreground' }, formatFileSize(size as number));
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Unggah',
    cell: ({ row }) => {
      const certificate = row.original;

      if (!certificate?.created_at) return '-';
      return h(
        'div',
        { class: 'text-sm text-muted-foreground' },
        DateTime.fromSeconds(certificate.created_at).setLocale('id').toFormat('DD')
      );
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    enableHiding: false,
    cell: ({ row }) => {
      const cert = row.original;
      return h('div', { class: 'text-right' }, h(CertificateActionsDropdown, { certificate: cert }));
    },
  },
];
