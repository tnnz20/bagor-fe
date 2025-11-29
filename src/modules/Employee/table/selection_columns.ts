import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';
import { Duration } from 'luxon';

import { getDepartmentName } from '@/lib/users';

import { Icons } from '@/components/icons';
import Button from '@/components/ui/button/Button.vue';
import SelectionDataDropdown from '../components/SelectionDataDropdown.vue';

import type { NominationDetail } from '@/types/ranking';

export const SelectionColumns: ColumnDef<NominationDetail>[] = [
  {
    accessorKey: 'employee_name',
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
      const employee = row.original;
      return h('div', { class: 'font-medium' }, `${employee.employee_name}`);
    },
  },

  {
    accessorKey: 'department_name',
    header: 'Divisi',
    cell: ({ row }) => {
      const dept = row.getValue('department_name');
      return h('div', { class: 'text-sm' }, getDepartmentName(dept as string) || '-');
    },
  },
  {
    accessorKey: 'employee_type',
    header: 'Jenis Pegawai',
    cell: ({ row }) => {
      const employeeType = row.getValue('employee_type');

      return h('div', { class: 'text-sm' }, (employeeType as string) || '-');
    },
  },
  {
    accessorKey: 'presence_score',
    header: 'Skor Presensi',
    cell: ({ row }) => {
      const presenceScore = row.getValue('presence_score');

      return h(
        'div',
        { class: 'text-sm' },
        presenceScore !== null && presenceScore !== undefined ? `${(presenceScore as number).toFixed(1)}%` : '-'
      );
    },
  },
  {
    accessorKey: 'survey_score',
    header: 'Skor Survei',
    cell: ({ row }) => {
      const surveyScore = row.getValue('survey_score');

      return h(
        'div',
        { class: 'text-sm' },
        surveyScore !== null && surveyScore !== undefined ? `${(surveyScore as number).toFixed(1)}%` : '-'
      );
    },
  },
  {
    accessorKey: 'attendance_delay_seconds',
    header: 'Total Keterlambatan',
    cell: ({ row }) => {
      const attendanceDelaySeconds = row.getValue('attendance_delay_seconds');

      return h(
        'div',
        { class: 'text-sm' },
        attendanceDelaySeconds !== null && attendanceDelaySeconds !== undefined
          ? Duration.fromObject({ seconds: attendanceDelaySeconds as number }).toFormat('hh:mm:ss')
          : '-'
      );
    },
  },

  {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;
      return h('div', { class: 'relative' }, h(SelectionDataDropdown, { employee }));
    },
  },
];
