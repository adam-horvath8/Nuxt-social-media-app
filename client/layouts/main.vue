<script lang="ts" setup></script>

<template>
  <Searchbar />

  <div class="container-lg px-4 px-lg-0">
    <div class="row justify-content-center">
      <div class="w-25 position-fixed left-10 top-20"><Navsection /></div>
      <div class="col-6 layout-padding">
        <slot />
      </div>

      <div class="w-25 position-fixed bg-secondary right-10 top-20">
        Rigth Section
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
