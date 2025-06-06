<template>
    <div class="flex justify-center min-h-[300px]">
        <p class="self-center">{{message}}</p>
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