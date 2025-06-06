<template>
    <div class="bg-gray-300 mt-4 rounded flex justify-between p-4 mx-4">
        <p>
            Displaying <b>{{ itemCount }}</b> of <b>{{ total }}</b>
        </p>
        <div>
            <label for="pageSize" class="mr-2">Page Size</label>
            <select
                name="pageSize" 
                class="rounded"
                :value="currentPageSize"
                @change="handleSelectChange"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useUpdateUrlParams } from '../composables/useUpdateUrlParams';
    const { updatePageSize } = useUpdateUrlParams();
    const props = defineProps({
        total: {
            type: Number,
            required: true
        },
        currentPageSize: {
            type: Number,
            required: true
        },
        currentPage:{
            type:Number,
            required: true
        }
    });

    const handleSelectChange = (event) => {
        const newPageSize = parseInt(event.target.value);
        updatePageSize(newPageSize);
    };

    const itemCount = computed(() => {
        if (props.total === 0) return '0 - 0';
        
        const itemStart = props.currentPage * props.currentPageSize + 1;
        const itemEnd = Math.min(itemStart + props.currentPageSize - 1, props.total);
        
        return `${itemStart} - ${itemEnd}`;
    });
</script>