import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';
import { Duration } from 'luxon';

import { getDepartmentNameByCode } from '@/lib/users';

import { Icons } from '@/components/icons';
import Button from '@/components/ui/button/Button.vue';
import EmployeeDropdownTable from '../components/EmployeeDropdownTable.vue';

import type { EmployeeScore } from '@/types/employee';

export const EmployeeColumns: ColumnDef<EmployeeScore>[] = [
  {
    accessorKey: 'full_name',
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
      return h('div', { class: 'font-medium' }, `${user.full_name}`);
    },
  },

  {
    accessorKey: 'department_code',
    header: 'Divisi',
    cell: ({ row }) => {
      const dept = row.getValue('department_code');
      return h('div', { class: 'text-sm' }, getDepartmentNameByCode(dept as string) || '-');
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
      return h('div', { class: 'relative' }, h(EmployeeDropdownTable, { employee }));
    },
  },
];
