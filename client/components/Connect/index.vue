<script lang="ts" setup>
import { useUsersStore } from "~/stores/users";

const usersStore = useUsersStore();

onMounted(async () => {
  await usersStore.getUsers();
});
</script>

<template>
  <div class="p-3 bg-white my-2 rounded-3">
    <h5>Connect</h5>
    <ConnectInput />
    <ConnectUsers :users="usersStore.searchUsers" />
  </div>
</template>

<style lang="css" scoped></style>
