<script lang="ts" setup></script>

<template>
  <div class="container-fluid contain-auth align-items-center">
    <div class="row align-items-center vh-100">
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img src="/logo.png" alt="" />
      </div>
      <div
        class="col-md-6 col-lg-4 bg-body-tertiary h-100 p-5 align-items-center"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.contain-auth {
  background-color: rgb(207, 199, 226);
}
</style>
