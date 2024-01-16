<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const subsStore = useSubsStore();

onMounted(() => {
  subsStore.getSubsPosts();
});
</script>

<template>
  <Post :posts="subsStore.subsPosts" />
</template>

<style lang="css" scoped></style>
