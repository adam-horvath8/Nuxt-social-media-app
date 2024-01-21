<script lang="ts" setup>
const { post } = defineProps(["post"]);

const { toggleLike, isLiked, checkLiked } = useLikes();

const postsStore = usePostsStore();
const subsStore = useSubsStore();
const authStore = useAuthStore();

const handleToggleLike = async () => {
  if (authStore.currentUser) {
    await toggleLike(authStore.currentUser.id, post.id);
  }

  postsStore.updateLikesCount(post.id, isLiked.value);
  subsStore.updateLikesCount(post.id, isLiked.value);
};

onMounted(async () => {
  if (authStore.currentUser) {
    await checkLiked(authStore.currentUser.id, post.id);
  }
});
</script>

<template>
  <div>
    <i
      @click.prevent.stop="handleToggleLike"
      v-if="isLiked"
      :class="'btn bi text-primary bi-hand-thumbs-up-fill'"
      ><span class="ms-1">{{ post.likesCount }}</span></i
    >
    <i
      @click.prevent.stop="handleToggleLike"
      v-else
      :class="'btn bi text-primary bi-hand-thumbs-up'"
      ><span class="ms-1">{{ post.likesCount }}</span></i
    >
  </div>
</template>

<style lang="css" scoped></style>
