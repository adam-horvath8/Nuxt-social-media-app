<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const subsStore = useSubsStore();
const authStore = useAuthStore();

watchEffect(() => {
  if (authStore.currentUser) {
    subsStore.getSubsPosts(authStore.currentUser?.id);
  }
});
</script>

<template>
  <div v-if="subsStore.subsPosts < 1" class="d-flex flex-column align-items-center">
    <h2>You Follow Nobody</h2>
    <p>Find People in Connect Section and Follow Them -></p>
  </div>
  <Post v-else :posts="subsStore.subsPosts" />
</template>

<style lang="css" scoped></style>
