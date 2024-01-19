<script lang="ts" setup>
const { post } = defineProps(["post"]);

const { getCount, count } = useCommentsCount();

watchEffect(async () => {
  await getCount(post.id);
});
</script>

<template>
  <div>{{ count }}</div>
</template>

<style lang="css" scoped></style>
