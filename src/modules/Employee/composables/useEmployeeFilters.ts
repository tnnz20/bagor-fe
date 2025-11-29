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
  // Search State
  const searchInput = ref<string>((route.query.search as string) || '');

  // Pagination State
  const page = ref<number>(Number(route.query.page) || 1);
  const pageSize = ref<number>(Number(route.query.pageSize) || 10);
  const initialDepartment = (route.query.department as string) || 'all';

  // Filters State
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

  // Handle Search Input (Debounced)
  const handleSearchUpdate = useDebounceFn((newVal: string) => {
    filters.search = newVal;
    page.value = 1; // Reset to page 1 on new search
    syncUrl();
  }, 500);

  watch(searchInput, handleSearchUpdate);

  // Watch for user's role/department code to load/change.
  watch(
    requiredDepartmentFilter,
    newRequiredDepartment => {
      if (newRequiredDepartment === 'all') {
        // Admin: If previously restricted by URL, reset to 'all' if the URL parameter isn't set.
        if (!route.query.department) {
          filters.department = 'all';
        }
      } else {
        // Manager/Restricted Role: FORCE filter to their department code
        filters.department = newRequiredDepartment;
      }
      page.value = 1;
      syncUrl();
    },
    { immediate: true }
  );

  // Handle Filter Dropdowns (Immediate)
  watch(
    () => [filters.department, filters.employeeType, filters.sort_order],
    () => {
      page.value = 1; // Reset to page 1 on filter change
      syncUrl();
    }
  );

  // Handle Pagination (Immediate)
  watch([page, pageSize], syncUrl);

  // --- Return the state and methods needed by the View ---
  return {
    searchInput,
    page,
    pageSize,
    filters,
  };
}
