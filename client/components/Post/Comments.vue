<script lang="ts" setup>
import type { postType } from '~/types';

const { post } = defineProps<{
  post: postType;
}>();

const { getCount, count } = useCommentsCount();

watchEffect(() => {
  getCount(post.id);
});
</script>

<template>
  <div class="d-flex gap-1 text-primary align-items-center">
    {{ count }}<i class="bi bi-chat-left-dots"></i>
  </div>
</template>

<style lang="css" scoped></style>
