<script lang="ts" setup>
import type { userType } from "~/types";

interface PropsI {
  user: userType;
  big: boolean
}
defineProps<PropsI>();
</script>

<template>
  <div>
    <img
      v-if="user.profile?.profileImg"
      :src="user.profile.profileImg"
      alt="profile image"
      :class="big ? 'rounded-circle pp-big' : 'rounded-circle pp'"
    />
    <img
      v-else
      src="/profile-img.jpg"
      alt="profile image"
      :class="big ? 'rounded-circle pp-big' : 'rounded-circle pp'"
    />
  </div>
</template>

<style lang="css" scoped></style>
