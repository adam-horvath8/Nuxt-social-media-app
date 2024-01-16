<script lang="ts" setup>
import type { userType } from "~/types";

interface PropsI {
  user: userType;
}
defineProps<PropsI>();
</script>

<template>
  <div
    v-if="user.profile?.name && user.profile?.surname"
    class="d-flex flex-column "
  >
    <span class="text-black">{{
      `${user.profile.name} ${user.profile.surname}`
    }}</span>
    <span class="text-decoration-underline username-link">{{
      `@${user.username}`
    }}</span>
  </div>
  <div v-else>
    <span class="text-decoration-underline username-link">{{
      `@${user.username}`
    }}</span>
  </div>
</template>

<style lang="css" scoped></style>
