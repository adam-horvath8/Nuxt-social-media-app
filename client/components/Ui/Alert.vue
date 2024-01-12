<script lang="ts" setup>
const toastStore = useToastStore();
</script>

<template>
  <div class="row">
    <UAlert
      v-if="toastStore.toastMessage"
      :title="toastStore.toastMessage.message"
      variant="outline"
      color="primary"
      class="c-alert col-sm-8 col-lg-4 bg-success-subtle text-center z-3"
    />
  </div>
</template>

<style lang="css" scoped>
.c-alert {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
