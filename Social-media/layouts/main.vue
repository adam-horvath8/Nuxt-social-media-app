<script lang="ts" setup></script>

<template>
  <Searchbar />

  <div class="container-lg px-4 px-lg-0">
    <div class="row justify-content-between">
      <div class="col-2 bg-warning p-0"><Navsection /></div>
      <div class="col-6 bg-primary">
        <slot />
      </div>

      <div class="col-3 bg-warning">Rigth Section</div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
