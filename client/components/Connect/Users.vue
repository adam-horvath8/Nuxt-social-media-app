<script lang="ts" setup>
defineProps(["users"]);
</script>

<template>
  <div class="p-3 users-list">
    <NuxtLink
      :to="`/profile/${user.id}`"
      v-for="user in users"
      :key="user.id"
      class="row user-link p-2 rounded-3 "
    >
      <div class="col-2 p-0">
        <img
          v-if="user.profile?.profileImg"
          :src="user.profile.profileImg"
          alt="profile image"
          class="post-profile rounded-circle"
        />
        <img
          v-else
          src="/profile-img.jpg"
          alt="profile image"
          width="50"
          height="50"
          class="rounded-circle post-profile"
        />
      </div>
      <div class="col-9">
        <div v-if="user.profile?.name && user.profile?.surname">
          <span>{{ `${user.profile.name} ${user.profile.surname}` }}</span>
          <span>{{ `@${user.username}` }}</span>
        </div>
        <div v-else>
          <span>{{ `@${user.username}` }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.user-link:hover {
  background-color: rgb(239, 239, 239, 1);
}

.users-list {
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
