import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';
import { DateTime } from 'luxon';

import { formatFileSize } from '@/lib/utils';

import { Icons } from '@/components/icons';
import Badge from '@/components/ui/badge/Badge.vue';
import BeritaAcaraDataDropdown from '../components/BeritaAcaraDataDropdown.vue';

import type { BeritaAcara } from '@/types/berita-acara';

export const BeritaAcaraColumns: ColumnDef<BeritaAcara>[] = [
  {
    accessorKey: 'title',
    header: 'Judul',
    cell: ({ row }) => {
      const beritaAcara = row.original;
      return h('div', { class: 'flex items-start space-x-3' }, [
        h('div', { class: 'flex-shrink-0 rounded-lg bg-red-50 p-2' }, [
          h(Icons.FileText, { class: 'h-5 w-5 text-destructive' }),
        ]),
        h('div', {}, [
          h('p', { class: 'text-sm font-semibold' }, beritaAcara.title),
          h('p', { class: 'text-xs text-muted-foreground' }, 'PDF Document'),
        ]),
      ]);
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => {
      const description = row.getValue('description');
      return h(
        'p',
        { class: 'text-sm text-muted-foreground max-w-[300px] truncate' },
        (description as string) || 'Tidak ada deskripsi'
      );
    },
  },
  {
    accessorKey: 'file_name',
    header: 'Nama File',
    cell: ({ row }) => {
      const fileName = row.getValue('file_name');
      return h('div', { class: 'flex items-center space-x-2' }, [
        h(Badge, { variant: 'outline', class: 'text-xs' }, () => fileName),
      ]);
    },
  },
  {
    accessorKey: 'size',
    header: 'Ukuran',
    cell: ({ row }) => {
      const size = row.getValue('size');
      return h('p', { class: 'text-sm text-muted-foreground' }, formatFileSize(size as number));
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat',
    cell: ({ row }) => {
      const beritaAcara = row.original;

      if (!beritaAcara?.created_at) return '-';

      return h(
        'p',
        { class: 'text-sm font-medium' },
        DateTime.fromSeconds(beritaAcara.created_at).setLocale('id').toFormat('DD')
      );
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    cell: ({ row }) => {
      const beritaAcara = row.original;
      return h('div', { class: 'relative' }, h(BeritaAcaraDataDropdown, { beritaAcara }));
    },
  },
];
