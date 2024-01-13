<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class=" rounded-3 bg-white p-3">
    <NuxtLink :to="`/profile/${authStore.currentUser?.id}`" class="d-flex gap-4">
      <img
        src="/profile-img.jpg"
        alt=""
        width="50"
        height="50"
        class="rounded-circle"
      />
      <div class="flex-column d-flex">
        <span>Full Name</span>
        <span>{{ `@${authStore.currentUser?.username}` }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped></style>
