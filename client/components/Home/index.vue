<script lang="ts" setup>
const postsStore = usePostsStore();

const { getPosts, isLoading } = useGetPosts();

onMounted(() => {
   getPosts();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="rounded-0 w-100 mb-1">
      <UiPostInput />
    </div>
    <BSpinner v-if="isLoading" />
    <Post v-else :posts="postsStore.filteredPosts" />
  </div>
</template>

<style lang="css" scoped></style>
