<script lang="ts" setup>
const postsStore = usePostsStore();

onMounted(() => {
  postsStore.getPosts();
});
</script>

<template>
  <div
    v-for="post in postsStore.posts"
    :key="post.id"
    class="card w-100 rounded-0"
  >
    <div class="card-body">
      <NuxtLink
        :to="`/profile/${post.userId}`"
        class="row text-decoration-none mb-3"
      >
        <div class="col-1 align-items-center p-0">
          <UiProfileImg :user="post.user" :big="false" />
        </div>
        <div class="col-10">
          <UiUserName :user="post.user" />
        </div>
      </NuxtLink>
      <PostText :post="post" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.post-profile {
  height: 40px;
}
</style>
