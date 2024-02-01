<script lang="ts" setup>
const switchChecked = ref<boolean | undefined>(false);

const { subscribedToId, subscriberId } = defineProps([
  "subscribedToId",
  "subscriberId",
]);

watch(switchChecked, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    useAddSub(subscribedToId, subscriberId);
  }
  if (newValue === false && oldValue === true) {
    useDeleteSub(subscribedToId, subscriberId);
  }
});

onMounted(async () => {
  switchChecked.value = await useCheckSub(subscribedToId, subscriberId);
});
</script>

<template>
  <div class="d-flex">
    <BFormCheckbox v-model="switchChecked" switch size="lg"> </BFormCheckbox>
    <span class="text-primary d-flex align-items-center">{{
      switchChecked ? "Following" : "Follow"
    }}</span>
  </div>
</template>

<style lang="css" scoped></style>
