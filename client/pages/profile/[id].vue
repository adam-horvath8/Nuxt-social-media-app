<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const { params } = useRoute();

const { getProfile, isLoading } = useGetProfile();

const authStore = useAuthStore();

onMounted(() => {
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (userId) {
    getProfile(userId);
  } else {
    navigateTo("/");
  }
});
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center">
    <BSpinner />
  </div>
  <div v-else class="bg-light p-2">
    <div>
      <ProfileSwitch
        v-if="params.id !== authStore.currentUser?.id"
        :subscribedToId="params.id"
        :subscriberId="authStore.currentUser?.id"
      />
      <ProfileForm :userId="params.id" />
      <ProfileInfo />
      <hr />
      <ProfilePosts :userId="params.id" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
