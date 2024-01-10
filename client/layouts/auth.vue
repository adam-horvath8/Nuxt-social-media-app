<script lang="ts" setup>
const showAlert = ref(false);

const handleShowAlert = () => {
  showAlert.value = true;
};
</script>

<template>
  <div class="container-lg">
    <div class="row align-items-center min-vh-100">
      <div class="col-6">
        <img src="/13757_malovani-podle-cisel-baby-yoda.png" alt="" />
      </div>
      <slot class="col-6" />
    </div>
  </div>
  <UAlert
    v-if="showAlert"
    description="You can add components to your app using the cli."
    title="Heads up!"
  />
  <button @click="handleShowAlert">A</button>
</template>

<style lang="css" scoped></style>
