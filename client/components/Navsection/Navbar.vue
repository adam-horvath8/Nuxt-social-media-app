<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <nav>
    <div
      class="btn-group-vertical w-100 shadow-low rounded-md"
      role="group"
      aria-label="Vertical button group"
    >
      <NuxtLink
        to="/home"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-house-door-fill me-3"></i>Home</NuxtLink
      >
      <NuxtLink
        to="/following"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-stack me-3"></i> Following</NuxtLink
      >
      <NuxtLink
        :to="`/profile/${authStore.currentUser?.id}`"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-person-lines-fill me-3"></i> Profile</NuxtLink
      >
    </div>
  </nav>
</template>

<style lang="css" scoped>
.router-link-exact-active {
  background-color: rgb(217, 217, 217);
  border-left: 0.4rem solid rgb(130, 75, 250);
}
</style>
