<script lang="ts" setup>
const modal = ref(false);
</script>

<template>
  <div>
    <BButton
      @click="modal = !modal"
      variant="primary"
      class="w-100 rounded-pill"
      >Add Post</BButton
    >
    <BModal v-model="modal" hide-footer>
      <UiPostInput :modal="modal"/>
    </BModal>
  </div>
</template>

<style lang="css" scoped></style>
