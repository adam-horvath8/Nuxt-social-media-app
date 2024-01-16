<script lang="ts" setup>
const postsStore = usePostsStore();

onMounted(() => {
  postsStore.getPosts();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="card p-2 py-3 rounded-0 w-100">
      <UiPostInput />
    </div>
    <Post :posts="postsStore.posts"/>
  </div>
</template>

<style lang="css" scoped></style>
