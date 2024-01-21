<script lang="ts" setup>
const { post } = defineProps(["post"]);

const { getCount, count } = useCommentsCount();

watchEffect(async () => {
  await getCount(post.id);
});
</script>

<template>
  <div class="d-flex gap-1 text-primary align-items-center">
    {{ count }}<i class="bi bi-chat-left-dots"></i>
  </div>
</template>

<style lang="css" scoped></style>
