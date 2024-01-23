<script lang="ts" setup>
const authStore = useAuthStore();

const modal = ref(false);

const handleCloseModal = () => {
  modal.value = false
}
</script>

<template>
  <nav>
    <div
      class="btn-group w-100"
      role="group"
      aria-label="Vertical button group"
    >
      <NuxtLink to="/home" type="button" class="btn btn-light btn-lg ps-4"
        ><i class="bi bi-house-door-fill me-3"></i
      ></NuxtLink>
      <NuxtLink to="/following" type="button" class="btn btn-light btn-lg ps-4"
        ><i class="bi bi-stack me-3"></i
      ></NuxtLink>

      <BButton @click="modal = !modal" class="btn btn-light btn-lg ps-4">
        <i class="bi bi-person-fill-add"></i>
      </BButton>
      <BModal v-model="modal" hide-footer centered >
        <Connect @close:modal="handleCloseModal"/>
      </BModal>

      <NuxtLink
        :to="`/profile/${authStore.currentUser?.id}`"
        type="button"
        class="btn btn-light btn-lg ps-4"
        ><i class="bi bi-person-lines-fill me-3"></i
      ></NuxtLink>
    </div>
  </nav>
</template>

<style lang="css" scoped></style>
