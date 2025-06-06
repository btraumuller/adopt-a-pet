<template>
    <div class="flex justify-center mt-4 px-4">
        <button 
            class="p-4 rounded mx-2 bg-blue-500 text-white disabled:bg-gray-300"
            :disabled="currentPage === 0"
            @click="handlePageChange(currentPage - 1)"
        >
            Previous
        </button>
        <template v-for="pageNum in totalPages" :key="pageNum">
            <button 
                v-if="shouldShowPage(pageNum)"
                class="p-4 rounded mx-2"
                :class="[
                    currentPage === pageNum - 1 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-blue-500 text-white'
                ]"
                @click="handlePageChange(pageNum - 1)"
            >
                {{ pageNum }}
            </button>
        </template>
        <button 
            class="p-4 rounded mx-2 bg-blue-500 text-white disabled:bg-gray-300"
            :disabled="currentPage === totalPages - 1"
            @click="handlePageChange(currentPage + 1)"
        >
            Next
        </button>
    </div>
</template>

<script setup>
    import { useUpdateUrlParams } from '../composables/useUpdateUrlParams';
    const { updateUrlParams } = useUpdateUrlParams();
    
    const props = defineProps({
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    });

    const handlePageChange = (newPage) => {
        updateUrlParams({page:newPage + 1})
    };

    const shouldShowPage = (pageNum) => {
        
        const pageIndex = pageNum - 1;
        
        
        if (props.currentPage === 0) {
            return pageIndex <= 2;
        }
        
        
        if (props.currentPage === props.totalPages - 1) {
            return pageIndex >= props.totalPages - 3;
        }
        
        
        return pageIndex >= props.currentPage - 1 && 
               pageIndex <= props.currentPage + 1;
    };
</script>