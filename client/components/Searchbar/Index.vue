<script lang="ts" setup></script>

<template>
  <div class="navbar bg-body-tertiary position-fixed w-100 z-2">
    <div class="container-fluid">
      <div class="row w-100 justify-content-between align-items-center">
        <NuxtLink to="/home" class="navbar-brand col-2" href="#">
          <img
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
            class="rounded-circle"
          />
        </NuxtLink>
        <!-- <div class="col-6"><SearchbarInput /></div> -->
        <div class="col-2"><SearchbarLogout /></div>
      </div>
    </div>
  </div>
</template>
