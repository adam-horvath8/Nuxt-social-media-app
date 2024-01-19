<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const postsStore = usePostsStore();

const { params } = useRoute();

const postId = Array.isArray(params.id) ? params.id[0] : params.id;

postsStore.setCurrentPostId(postId);
const post = postsStore.post();

console.log(post);
</script>

<template>
  <div v-if="post">
    <NuxtLink
      :to="`/post/${post.id}`"
      :key="post.id"
      class="card w-100 rounded-0 post-link mb-1"
    >
      <div class="card-body pt-1 w-100">
        <NuxtLink
          :to="`/profile/${post.userId}`"
          class="row text-decoration-none user-link rounded-3 p-2"
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
    </NuxtLink>
    <UiPostInput :isComment="true" :postId="post.id" />
    <Post :posts="postsStore.commentPosts" />
  </div>

  <div v-else>
    <p>Post not found or loading...</p>
  </div>
</template>

<style lang="css" scoped></style>
