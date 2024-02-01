<script lang="ts" setup>
import type { usersType } from "~/types";

interface PropsI {
  users: usersType;
  isLoading: boolean;
}

const { users, isLoading } = defineProps<PropsI>();

console.log(users);
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center">
    <BSpinner />
  </div>
  <div v-else class="p-3 users-list">
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
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}

@media (min-width: 992px) {
  .users-list {
    max-height: auto;
  }
}
</style>
