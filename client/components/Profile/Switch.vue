<script lang="ts" setup>
const subsStore = useSubsStore();

const switchChecked = ref<boolean | undefined>(false);

const { subscribedToId, subscriberId } = defineProps(["subscribedToId", "subscriberId"]);

watch(switchChecked, async (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    await subsStore.addSubscription(subscribedToId, subscriberId);
  }
  if (newValue === false && oldValue === true) {
    await subsStore.deleteSubscription(subscribedToId, subscriberId);
  }
});

onMounted(async () => {
  switchChecked.value = await subsStore.checkSubscription(subscribedToId, subscriberId);
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
