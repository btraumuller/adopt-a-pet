import { useRoute, useRouter } from 'vue-router';  

export function useUpdateUrlParams() {
    const route = useRoute();
    const router = useRouter();
    
    const updateUrlParams = (updates) => {
        
    
        // Combine existing and new query params, filtering out empty values
        const query = {
            ...route.query,
            ...updates
        };

        // Remove empty values
        Object.keys(query).forEach(key => {
            if (query[key] === null || query[key] === undefined || query[key] === '') {
                delete query[key];
            }
        });

        router.replace({ query });
    };

    const updatePage = (page) => {
        updateUrlParams({ page });
    };

    const updatePageSize = (pageSize) => {
        updateUrlParams({ pageSize, page: 1 }); // Reset to first page
    };

    const updateFilter = (filter) => {
        updateUrlParams({ filter, page: 1 }); // Reset to first page
    };

    return {
        updateUrlParams,
        updatePage,
        updatePageSize,
        updateFilter
    };
}