<script lang="ts" setup>
const { users, getUsers } = useGetUsers();

watchEffect(() => {
 getUsers();
});
</script>

<template>
  <div class="p-3 bg-white my-2 rounded-3">
    <h5>Connect</h5>
    <ConnectInput />
    <ConnectUsers :users="users" />
  </div>
</template>

<style lang="css" scoped></style>
