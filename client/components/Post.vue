<script lang="ts" setup>
const postsStore = usePostsStore();

onMounted(() => {
  postsStore.getPosts();
});
</script>

<template>
  <div v-for="post in postsStore.posts" :key="post" class="card w-100">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <img
          v-if="post.user.profile?.profileImg"
          :src="post.user.profile.profileImg"
          alt="profile image"
        />
        <img
          v-else
          src="/profile-img.jpg"
          alt="profile image"
          width="50"
          height="50"
          class="rounded-circle"
        />
        <h5 class="card-title">{{ post.user.username }}</h5>
      </div>
      <p>{{ post.text }}</p>
      <div class="w-100 d-flex justify-content-center">
        <img :src="post.imageSrc" alt="Post image" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
