import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';
import { DateTime } from 'luxon';

import { getDepartmentName, getRoleVariant } from '@/lib/users';

import { Icons } from '@/components/icons';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import UsersDataTableDropdown from '../components/UsersDataTableDropdown.vue';

import type { UserRole, UserTableColumn } from '@/types/user';

export const UserColumns: ColumnDef<UserTableColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nama', h(Icons.ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return h('div', { class: 'font-medium' }, `${user.name}`);
    },
  },

  {
    accessorKey: 'department',
    header: 'Divisi',
    cell: ({ row }) => {
      const dept = row.getValue('department');
      return h('div', { class: 'text-sm' }, getDepartmentName(dept as string) || '-');
    },
  },
  {
    accessorKey: 'position',
    header: 'Jabatan',
    cell: ({ row }) => {
      const position = row.getValue('position');
      return h('div', { class: 'text-sm' }, (position as string) || '-');
    },
  },
  {
    accessorKey: 'employeeType',
    header: 'Jenis Pegawai',
    cell: ({ row }) => {
      const employeeType = row.getValue('employeeType');

      return h('div', { class: 'text-sm' }, (employeeType as string) || '-');
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role');

      return h(
        Badge,
        { variant: getRoleVariant(role as UserRole) },
        () => (role as string).charAt(0).toUpperCase() + (role as string).slice(1)
      );
    },
  },
  {
    id: 'updated_at',
    header: 'Terakhir Diperbaharui',
    cell: ({ row }) => {
      const user = row.original;
      return h(
        'div',
        { class: 'text-sm text-muted-foreground' },
        DateTime.fromSeconds(user.updated_at).setLocale('id').toFormat('DD')
      );
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return h('div', { class: 'relative' }, h(UsersDataTableDropdown, { user }));
    },
  },
];
