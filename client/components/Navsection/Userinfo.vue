<script lang="ts" setup>
import type { userType } from "~/types";

const user = ref<userType>();
const authStore = useAuthStore();
const { getUsers, getSpecificUser } = useGetUsers();

const fetchAndSetUser = async () => {
  await getUsers();

  if (authStore.currentUser) {
    user.value = getSpecificUser(authStore.currentUser.id);
  }
};

watchEffect(fetchAndSetUser);
</script>

<template>
  <div class="rounded-3 bg-white p-3">
    <div class="d-flex gap-4">
      <UiProfileImg v-if="user" :user="user" :big="true" />
      <div class="flex-column d-flex">
        <span>{{ user?.profile?.name }} {{ user?.profile?.surname }}</span>
        <NuxtLink :to="`/profile/${authStore.currentUser?.id}`">{{
          `@${authStore.currentUser?.username}`
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
