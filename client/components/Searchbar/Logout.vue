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
    <button
      @click="handleLogout"
      class="btn btn-outline-secondary btn-sm rounded-pill d-flex gap-1"
    >
      <i class="bi bi-door-closed-fill"></i>
      Log out
    </button>
  </div>
</template>

<style lang="css" scoped></style>
