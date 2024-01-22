<script lang="ts" setup>
import type { usersType } from "~/types";

interface PropsI {
  users: usersType;
}

const { users } = defineProps<PropsI>();

console.log(users);
</script>

<template>
  <div class="p-3 users-list">
    <NuxtLink
      :to="`/profile/${user.id}`"
      v-for="user in users"
      :key="user.id"
      class="row user-link p-2 rounded-3 text-decoration-none"
    >
      <div class="col-3 p-0">
        <UiProfileImg :user="user" :big="false" />
      </div>
      <div class="col-9">
        <UiUserName :user="user" />
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.users-list {
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
}

@media (min-width: 992px) {
  .users-list {
    height: 50vh;
  }
}
</style>
