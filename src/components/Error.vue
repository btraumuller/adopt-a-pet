<template>
    <div class="flex justify-center min-h-[300px]">
        <p class="self-center text-red-500">{{message}}</p>
    </div>
</template>
<script setup>
    const props = defineProps({
        message:{
            type:String,
            required:true
        }
    });
</script>