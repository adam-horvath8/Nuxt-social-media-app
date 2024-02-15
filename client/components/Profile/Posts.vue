<script lang="ts" setup>
interface PropsI {
  userId: string;
}

const { userId } = defineProps<PropsI>();

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
