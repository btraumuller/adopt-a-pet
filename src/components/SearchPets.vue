<template>
    <div class="mt-4 p-4">
      <form @submit.prevent="handleSearch">
        <div class="flex flex-col items-center">
            <label for="search-name" class="sr-only">Search by Breed, Sub-Breed or Name</label>
            <div class="flex w-full justify-center">
              <input 
                    v-model="searchQuery"
                    type="text" 
                    name="search-name" 
                    id="search-name" 
                    class="w-full md:max-w-[500px] p-2 rounded-l border border-gray-200" 
                    placeholder="Search by Breed, Sub-Breed or Name" 
                />
                <button type="submit" class="bg-blue-500 text-white p-2 rounded-r">Search</button>
            </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useUpdateUrlParams } from '../composables/useUpdateUrlParams';

    const props = defineProps({
        inputValue: {
            type: String,
            default: ''
        }
    });

    const route = useRoute();
    
    const { updateUrlParams } = useUpdateUrlParams();
    
    const searchQuery = ref(props.inputValue);

    const handleSearch = () => {
        if (searchQuery.value) {
            updateUrlParams({
                filter: searchQuery.value,
                page: 1  
            });
        } else {
            
            const newQuery = { ...route.query };
            delete newQuery.filter;
            updateUrlParams({
                filter: undefined,
                page: 1
            });
        }
    };
</script>