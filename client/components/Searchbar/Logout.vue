<script lang="ts" setup>
const authStore = useAuthStore();
const usersStore = useUsersStore();

const router = useRouter();

const handleLogout = async () => {
  try {
    const response = await $fetch<{ message: string }>(`${url}/auth/logout`);

    if (response.message) {
      authStore.logout();
      usersStore.clearSearchInput();
      router.push("/");
    }
  } catch (error) {
    console.log(error);
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
