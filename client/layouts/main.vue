<script lang="ts" setup></script>

<template>
  <Searchbar />
  <div class="container-fluid">
    <div
      class="row justify-content-center justify-content-md-end justify-content-lg-center"
    >
      <MainLayoutLarge />
      <MainLayoutMedium />
      <MainLayoutSmall />
      <div class="col-md-7 col-lg-5 layout-padding">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sidebars {
  min-width: 20%;
}
</style>
