<script lang="ts" setup>
const profileStore = useProfileStore();
</script>

<template>
  <div class="d-flex flex-column pt-3">
    <div class="align-self-center">
      <img
        v-if="profileStore.profile.profileImg"
        :src="profileStore.profile.profileImg"
        alt="profile image"
        class="pp-xxl rounded-circle"
      />
      <img
        v-else
        src="/profile-img.jpg"
        alt="profile image"
        class="pp-xxl rounded-circle"
      />
    </div>
    <div class="row p-4">
      <div class="col-6">
        <h5>Name:</h5>
        <span>{{ profileStore.profile.name }}</span>
      </div>
      <div class="col-6">
        <h5>Surname:</h5>
        <span>{{ profileStore.profile.surname }}</span>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-6">
        <h5>Email:</h5>
        <span class="text-break">{{ profileStore.profile.email }}</span>
      </div>
      <div class="col-6">
        <h5>Tel. Number:</h5>
        <span>{{ profileStore.profile.telNumber }}</span>
      </div>
    </div>
    <div class="row p-4">
      <h5>Address:</h5>
      <p>{{ profileStore.profile.address }}</p>
    </div>
    <div class="row p-4">
      <h5>About me:</h5>
      <p>{{ profileStore.profile.description }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
