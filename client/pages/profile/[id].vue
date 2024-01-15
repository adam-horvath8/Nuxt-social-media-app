<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const { params } = useRoute();
const router = useRouter();

const profileStore = useProfileStore();

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
    <ProfileForm />
    <ProfileInfo />
  </div>
</template>

<style lang="css" scoped></style>
