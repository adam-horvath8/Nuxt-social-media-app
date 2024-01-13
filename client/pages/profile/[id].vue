<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const route = useRoute();
</script>

<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<style lang="css" scoped></style>
