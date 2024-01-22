<script lang="ts" setup>
const postsStore = usePostsStore();

onMounted(async () => {
  await postsStore.getPosts();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="rounded-0 w-100 mb-1">
      <UiPostInput />
    </div>
    <Post :posts="postsStore.filteredPosts" />
  </div>
</template>

<style lang="css" scoped></style>
