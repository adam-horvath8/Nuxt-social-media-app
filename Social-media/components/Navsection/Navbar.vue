<script lang="ts" setup></script>

<template>
  <nav>
    <div
      class="btn-group-vertical w-100"
      role="group"
      aria-label="Vertical button group"
    >
      <NuxtLink to="/home" type="button" class="btn btn-light btn-lg"
        >Home</NuxtLink
      >
      <NuxtLink to="/following" type="button" class="btn btn-light btn-lg"
        >Following</NuxtLink
      >
      <NuxtLink to="/bookmarks" type="button" class="btn btn-light btn-lg"
        >Bookmarks</NuxtLink
      >
      <NuxtLink to="/profile" type="button" class="btn btn-light btn-lg"
        >Profile</NuxtLink
      >
      <NuxtLink to="/settings" type="button" class="btn btn-light btn-lg"
        >Settings</NuxtLink
      >
    </div>
  </nav>
</template>

<style lang="css" scoped></style>
