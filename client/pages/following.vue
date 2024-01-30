<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const authStore = useAuthStore();
const subsStore = useSubsStore();

const { getSubsPosts, isLoading } = useGetSubsPosts();

watchEffect(() => {
  if (authStore.currentUser) {
    getSubsPosts(authStore.currentUser?.id);
  }
});
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center">
    <BSpinner />
  </div>
  <div
    v-else-if="subsStore.subsPosts < 1"
    class="d-flex flex-column align-items-center"
  >
    <h2>You Follow Nobody</h2>
    <p>Find People in Connect Section and Follow Them</p>
  </div>
  <Post v-else :posts="subsStore.subsPosts" />
</template>

<style lang="css" scoped></style>
