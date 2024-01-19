<script lang="ts" setup>
const { userId } = defineProps(["userId"]);

console.log(userId);

const postsStore = usePostsStore();

watch(
  () => userId,
  (newUserId) => {
    postsStore.setUserId(newUserId);
  },
  { immediate: true }
);

const filteredPosts = postsStore.filteredPosts;
console.log(filteredPosts);
</script>

<template>
  <div>
    <h3 v-if="filteredPosts.length > 0">Posts</h3>
    <Post :posts="filteredPosts" />
  </div>
</template>

<style lang="css" scoped></style>
