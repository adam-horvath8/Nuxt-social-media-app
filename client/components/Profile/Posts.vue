<script lang="ts" setup>
const { userId } = defineProps(["userId"]);

const postsStore = usePostsStore();

postsStore.setUserId(userId);

const filteredPosts = postsStore.filteredPosts;
</script>

<template>
  <h3 v-if="filteredPosts.length > 0">Posts</h3>
  <div
    v-for="post in filteredPosts"
    :key="post.id"
    class="card w-100 rounded-0"
  >
    <div class="card-body">
      <NuxtLink
        :to="`/profile/${post.userId}`"
        class="row text-decoration-none mb-3"
      >
        <div class="col-2 p-0">
          <UiProfileImg :user="post.user" :big="false" />
        </div>
        <div class="col-10 p-0">
          <UiUserName :user="post.user" />
        </div>
      </NuxtLink>
      <PostText :post="post" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
