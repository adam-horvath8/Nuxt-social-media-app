<script lang="ts" setup></script>

<template>
  <div class="container-fluid contain-auth px-5">
    <div class="row align-items-center min-vh-100">
      <div class="col-6">
        <img src="/logo.png" alt="" />
      </div>
      <slot class="col-6" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.contain-auth {
  background-color: rgb(207, 199, 226);
}
</style>
