<script lang="ts" setup>
defineProps(["posts"]);
</script>

<template>
  <NuxtLink
    :to="`/post/${post.id}`"
    v-for="post in posts"
    :key="post.id"
    class="card w-100 rounded-0 post-link"
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
      <PostComments :post="post"/>
    </div>
  </NuxtLink>
</template>

<style lang="css" scoped>
.post-profile {
  height: 40px;
}
</style>
