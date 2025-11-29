import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useDebounceFn } from '@vueuse/core';

import { useUserStore } from '@/stores/user';

import type { FilterEmployees } from '@/types/employee';

export function useEmployeeFilters() {
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  // --- 1. User Role & Department Logic ---
  const requiredDepartmentFilter = computed(() => {
    if (userStore.userRole !== 'admin' && userStore.userDepartmentCode) {
      return userStore.userDepartmentCode;
    }
    return 'all';
  });

  // --- 2. State Initialization ---
  const searchInput = ref<string>((route.query.search as string) || '');
  const page = ref<number>(Number(route.query.page) || 1);
  const pageSize = ref<number>(Number(route.query.pageSize) || 10);
  const initialDepartment = (route.query.department as string) || 'all';

  const filters = reactive<FilterEmployees>({
    department: initialDepartment,
    employeeType: (route.query.employeeType as string) || 'all',
    search: (route.query.search as string) || '',
    sort_order: (route.query.sort_order as 'ASC' | 'DESC') || 'ASC',
  });

  // --- 3. URL Sync Logic ---
  const activeFiltersForUrl = computed(() => {
    const query: Record<string, string> = {
      page: page.value.toString(),
      pageSize: pageSize.value.toString(),
    };

    if (filters.search?.trim()) query.search = filters.search.trim();
    if (filters.department !== 'all') query.department = filters.department;
    if (filters.employeeType !== 'all') query.employeeType = filters.employeeType;
    if (filters.sort_order) query.sort_order = filters.sort_order;

    return query;
  });

  const syncUrl = () => {
    router.replace({ query: activeFiltersForUrl.value });
  };

  // --- 4. Watchers & Handlers ---

  const handleSearchUpdate = useDebounceFn((newVal: string) => {
    filters.search = newVal;
    page.value = 1;
    syncUrl();
  }, 500);

  watch(searchInput, handleSearchUpdate);

  // FIX: User Role/Department Watcher
  watch(
    requiredDepartmentFilter,
    newRequiredDepartment => {
      if (newRequiredDepartment === 'all') {
        // Admin: If previously restricted by URL, reset to 'all' if the URL parameter isn't set.
        if (!route.query.department && filters.department !== 'all') {
          filters.department = 'all';
        }
      } else if (filters.department !== newRequiredDepartment) {
        // Manager/Restricted Role: FORCE filter to their department code
        // (We merged 'else' + 'if' into 'else if' here)
        filters.department = newRequiredDepartment;
      }
    },
    { immediate: true }
  );

  // This handles the side effects for Department, Type, and Sort
  watch(
    () => [filters.department, filters.employeeType, filters.sort_order],
    () => {
      page.value = 1; // Reset page on any filter change
      syncUrl(); // Sync the URL
    }
  );

  watch([page, pageSize], syncUrl);

  return {
    searchInput,
    page,
    pageSize,
    filters,
  };
}
