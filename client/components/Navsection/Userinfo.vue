<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="d-flex gap-4 rounded-3 bg-white p-3">
    <img
      src="/13757_malovani-podle-cisel-baby-yoda.png"
      alt=""
      width="50"
      height="50"
      class="rounded-circle"
    />
    <div class="flex-column d-flex">
      <span>Full Name</span>
      <span>{{ `@${authStore.currentUser?.username}` }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
