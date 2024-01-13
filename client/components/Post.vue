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
      <NuxtLink :to="`/profile/${post.userId}`" class="row">
        <div class="col-1 align-items-center p-0">
          <img
            v-if="post.user.profile?.profileImg"
            :src="post.user.profile.profileImg"
            alt="profile image"
            class="post-profile rounded-circle"
          />
          <img
            v-else
            src="/profile-img.jpg"
            alt="profile image"
            width="50"
            height="50"
            class="rounded-circle post-profile"
          />
        </div>
        <div class="col-10">
        <div v-if="post.user.profile?.name && post.user.profile?.surname">
          <span>{{ `${post.user.profile.name} ${post.user.profile.surname}` }}</span>
          <span>{{ `@${post.user.username}` }}</span>
        </div>
        <div v-else>
          <span>{{ `@${post.user.username}` }}</span>
        </div>
      </div>
      </NuxtLink>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10 p-0">
          <p>{{ post.text }}</p>
          <div class="w-100 d-flex justify-content-center">
            <img v-if="post.imageSrc" :src="post.imageSrc" alt="Post image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.post-profile {
  height: 40px;
}
</style>
