<script lang="ts" setup>
const authStore = useAuthStore();

const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  if (!authStore.isAuth) {
    router.push("/");
  }
};
</script>

<template>
  <div class="d-flex justify-content-end w-100">
    <NuxtLink
      :to="`/profile/${authStore.currentUser?.id}`"
      class="navbar-brand"
    >
      <img
        src="/profile-img.jpg"
        alt="logo"
        width="30"
        height="30"
        class="rounded-circle profile-photo"
      />
    </NuxtLink>
    <button
      @click="handleLogout"
      class="btn btn-outline-secondary btn-sm rounded-pill"
    >
      Logout
    </button>
  </div>
</template>

<style lang="css" scoped></style>
