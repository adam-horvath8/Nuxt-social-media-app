<script lang="ts" setup>
defineProps(["posts"]);
</script>

<template>
  <NuxtLink
    :to="`/post/${post.id}`"
    v-for="post in posts"
    :key="post.id"
    class="card w-100 rounded-0 post-link text-decoration-none"
  >
    <div class="card-body pt-1 w-100 pb-0">
      <div class="d-flex justify-content-between">
        <NuxtLink
          :to="`/profile/${post.userId}`"
          class="row text-decoration-none user-link rounded-3 p-2 flex-1"
        >
          <div class="col-2 p-0">
            <UiProfileImg :user="post.user" :big="false" />
          </div>
          <div class="col-10 p-0">
            <UiUserName :user="post.user" />
          </div>
        </NuxtLink>
      </div>

      <PostText :post="post" />
      <div class="d-flex justify-content-between">
        <PostComments :post="post" />
        <PostLike :post="post" />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="css" scoped>
.post-profile {
  height: 40px;
}
</style>
