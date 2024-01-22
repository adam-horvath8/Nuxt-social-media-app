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

const filteredProfilePosts = postsStore.filteredProfilePosts;
console.log(filteredProfilePosts);
</script>

<template>
  <div>
    <h3 v-if="filteredProfilePosts.length > 0">Posts</h3>
    <Post :posts="filteredProfilePosts" />
  </div>
</template>

<style lang="css" scoped></style>
