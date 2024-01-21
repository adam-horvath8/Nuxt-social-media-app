<script lang="ts" setup>
import type { postType } from '~/types';

interface PropsI {
    post: postType
} 

defineProps<PropsI>()
</script>

<template>
      <div class="row mb-2">
        <div class="col-1"></div>
        <div class="col-10 p-0 ">
          <p class="mb-2">{{ post.text }}</p>
          <div class="w-100 d-flex justify-content-center">
            <img v-if="post.imageSrc" :src="post.imageSrc" alt="Post image" />
          </div>
        </div>
      </div>
</template>

<style lang="css" scoped>
    
</style>
