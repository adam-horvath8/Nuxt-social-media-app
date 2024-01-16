<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const { params } = useRoute();
const router = useRouter();

const profileStore = useProfileStore();
const authStore = useAuthStore();

onMounted(() => {
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (userId) {
    profileStore.getProfile(userId);
  } else {
    router.push("/");
  }
});
</script>

<template>
  <div class="bg-light p-2">
    <button
      v-if="params.id !== authStore.currentUser?.id"
      class="btn btn-primary"
    >
      Follow
    </button>
    <ProfileForm :userId="params.id" />
    <ProfileInfo />
    <hr />
    <ProfilePosts :userId="params.id" />
  </div>
</template>

<style lang="css" scoped></style>
