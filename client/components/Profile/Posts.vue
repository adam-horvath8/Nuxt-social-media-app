<script lang="ts" setup>
const { userId } = defineProps(["userId"]);

const postsStore = usePostsStore();

postsStore.setUserId(userId);

const filteredPosts = postsStore.filteredPosts;
</script>

<template>
  <h3 v-if="filteredPosts.length > 0">Posts</h3>
  <Post :posts="filteredPosts"/>
</template>

<style lang="css" scoped></style>
