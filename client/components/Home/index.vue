<script lang="ts" setup>
const postsStore = usePostsStore();

onMounted(() => {
  postsStore.getPosts();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="rounded-0 w-100 mb-1">
      <UiPostInput />
    </div>
    <Post :posts="postsStore.reversePosts" />
  </div>
</template>

<style lang="css" scoped></style>
