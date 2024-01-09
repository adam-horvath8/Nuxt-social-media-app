<script lang="ts" setup></script>

<template>
  <div class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div class="row w-100 justify-content-between align-items-center">
        <div class="col-2">
          <NuxtLink to="/home" class="navbar-brand" href="#">
            <img
              src="/13757_malovani-podle-cisel-baby-yoda.png"
              alt="logo"
              width="30"
              height="30"
              class="rounded-circle"
            />
          </NuxtLink>
        </div>
        <div class="col-6"><SearchbarInput /></div>
        <div class="col-2"><SearchbarLogout /></div>
      </div>
    </div>
  </div>
</template>
