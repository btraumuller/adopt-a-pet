<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-600 mb-4">Welcome to Adopt-a-Pet</h1>
    <p class="text-xl text-gray-600">Find your furry companion today!</p>
    <SearchPets :inputValue="filter" />
    <FilterBar 
        :total="total" 
        :current-page-size="pageSize"
        @update:page-size="handlePageSizeChange"
        :currentPage="page"
    />
    <Loading v-if="isLoading.active" :message="isLoading.message" />
    <div v-if="items && items.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <DogCard v-for="item in items" :key="item.name" :dog="item" />
    </div>
    <div v-else-if="items.length === 0 && !isLoading.active && !error.message" class="flex justify-center min-h-[300px]">
        <p class="self-center">No dogs found</p>
    </div>
    <Error v-if="error.message" :message="error.publicMessage" />
    <Pagination v-if="total > 0" 
        :current-page="page"
        :total-pages="totalPages"
        @update:page="handlePageChange"
    />
  </div>
</template>

<script setup>
    import { onBeforeMount, watch, computed } from 'vue';
    import { useRoute } from 'vue-router';

    import { useUpdateUrlParams } from '../composables/useUpdateUrlParams';
    const { updatePage, updatePageSize} = useUpdateUrlParams();

    import { useFetchData } from '../composables/useFetchData';
    const {items, page, pageSize, filter, total, isLoading, error, fetchData} = useFetchData();

    import DogCard from '../components/DogCard.vue';
    import SearchPets from '../components/SearchPets.vue';
    import FilterBar from '../components/FilterBar.vue';
    import Pagination from '../components/Pagination.vue';
    import Loading from '../components/Loading.vue'
    import Error from '../components/Error.vue';

    const totalPages = computed(() => {
        return Math.ceil(total.value / pageSize.value);
    });

    const route = useRoute();

    function handlePageSizeChange(newPageSize) {
        updatePageSize(newPageSize);
    }

    function handlePageChange(newPage) {
        updatePage(newPage);
    }

    watch(
        () => route.query,
        () => {
            fetchData();
        },
        { deep: true }
    );

    onBeforeMount(() => {
        fetchData();
    });
        
</script>