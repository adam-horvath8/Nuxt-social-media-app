<script lang="ts" setup></script>

<template>
  <Searchbar />

  <div class="container-lg px-4 px-lg-0 d-none d-sm-block">
    <div class="row justify-content-center">
      <div class="w-25 position-fixed left-10 top-20"><Navsection /></div>
      <div class="col-6 layout-padding">
        <slot />
      </div>

      <div class="w-25 position-fixed right-10 top-20">
        <Connect />
      </div>
    </div>
  </div>

  <div class="d-sm-none">
    <div class="fixed-bottom">
      <NavsectionMobileNav />
    </div>
    <div class="layout-padding">
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.sidebars {
  min-width: 20%;
}
</style>
