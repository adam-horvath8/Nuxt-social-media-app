<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const postsStore = usePostsStore();

const { getPosts, isLoading } = useGetPosts();

const { params } = useRoute();

const postId = Array.isArray(params.id) ? params.id[0] : params.id;

postsStore.setCurrentPostId(postId);
const post = postsStore.post();

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div v-if="post" class="d-flex flex-column">
    <BButton
      @click="deletePost(postId)"
      variant="outline-danger"
      class="m-auto mb-2"
      size="sm"
      ><i class="bi bi-trash-fill"></i
    ></BButton>
    <NuxtLink
      :to="`/post/${post.id}`"
      :key="post.id"
      class="card rounded-0 post-link mb-3 border-primary border-2 p-2 pb-0 text-decoration-none"
    >
      <div class="card-body pt-1">
        <NuxtLink
          :to="`/profile/${post.userId}`"
          class="row user-link rounded-3 p-2 text-decoration-none"
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
    <BSpinner v-if="isLoading" class="m-auto"/>
    <Post v-else :posts="postsStore.commentPosts" />
  </div>

  <div v-else>
    <p>Post not found or loading...</p>
  </div>
</template>

<style lang="css" scoped></style>
