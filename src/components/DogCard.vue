<template>
    <div class="bg-white border border-gray-200 rounded-md flex p-4 shadow-sm">
        <div class="flex-1">
            <img v-if="dog['image-src']" :src="dog['image-src']" :alt="`${dog.name}-image`" class="w-full h-[200px] object-cover rounded-md" />
            <div v-else class="bg-gray-500 text-white p-4 rounded-md text-center h-[200px] flex items-center justify-center">Photo Unavailable</div>
        </div>
        <div class="flex-1 pl-4">
            <h2 class="text-2xl text-center font-semibold mb-2">{{ dog.name }}</h2>
            <p class="text-gray-600 text-left capitalize">Breed: {{ dog.breed }}</p>
            <p class="text-gray-600 text-left">Age: {{ dog.age }}</p>
            <p v-if="dog['health-concerns'] !== 'None'" class="text-gray-600 text-left capitalize">Health Concerns: {{ dog['health-concerns'] }}</p>
            <p class="text-gray-600 text-left capitalize">Status: {{ dog.status }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        dog: {
            type: Object,
            required: true
        }
    })
</script>