<script lang="ts" setup>
const modal = ref(false);

const handleCloseModal = () => {
  modal.value = false
}
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
      <UiPostInput @close:modal="handleCloseModal"/>
    </BModal>
  </div>
</template>

<style lang="css" scoped></style>
