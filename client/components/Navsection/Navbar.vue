<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <nav>
    <div
      class="btn-group-vertical w-100"
      role="group"
      aria-label="Vertical button group"
    >
      <NuxtLink to="/home" type="button" class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-house-door-fill me-3"></i>Home</NuxtLink
      >
      <NuxtLink
        to="/following"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-stack me-3"></i> Following</NuxtLink
      >
      <NuxtLink
        to="/bookmarks"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-bookmarks-fill me-3"></i> Bookmarks</NuxtLink
      >
      <NuxtLink
        :to="`/profile/${authStore.currentUser?.id}`"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-person-lines-fill me-3"></i> Profile</NuxtLink
      >
      <NuxtLink
        to="/settings"
        type="button"
        class="btn btn-light btn-lg text-start ps-4"
        ><i class="bi bi-gear-fill me-3"></i> Settings</NuxtLink
      >
    </div>
  </nav>
</template>

<style lang="css" scoped></style>
