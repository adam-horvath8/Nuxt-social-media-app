<script lang="ts" setup>
import { Form, Field } from "vee-validate";

defineProps(["userId"]);

const modal = ref(false);
const fileName = ref("");
const fileInput = ref();

const toastStore = useToastStore();
const profileStore = useProfileStore();
const usersStore = useUsersStore();
const authStore = useAuthStore();

const handleSubmit = async (values: Record<string, any>) => {
  if (!authStore.currentUser) {
    toastStore.displayToast("You need to be logged in!", true);
    return;
  }

  const formData = new FormData();

  formData.append("description", values.description);
  formData.append("name", values.name);
  formData.append("surname", values.surname);
  formData.append("address", values.address);
  formData.append("email", values.email);
  formData.append("telNumber", values.telNumber);

  if (fileInput.value && fileInput.value.files[0]) {
    formData.append("image", fileInput.value.files[0]);
  }

  profileStore.updateProfile(authStore.currentUser.id, formData);
  fileName.value = "";
  modal.value = false;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = () => {
  const files = fileInput.value.files;
  if (files && files.length > 0) {
    fileName.value = files[0].name;
  }
};
</script>

<template>
  <BButton
    v-if="userId === authStore.currentUser?.id"
    @click="modal = !modal"
    variant="primary"
  >
    Update Profile</BButton
  >
  <BModal v-model="modal" title="Update Profile" hide-footer>
    <Form @submit="handleSubmit" class="d-flex flex-column gap-3 mx-2">
      <div class="d-flex flex-column">
        <input
          name="image"
          id="image"
          type="file"
          class="d-none"
          ref="fileInput"
          @change="handleFileChange"
        />
        <label for="image">Profile Photo</label>
        <button
          type="button"
          @click="triggerFileInput"
          class="btn btn-outline-primary mr-2"
        >
          <i class="bi bi-image"></i>
        </button>
        <span v-if="fileName">{{ fileName }}</span>
      </div>

      <div>
        <label for="name">About me:</label>
        <Field
          id="description"
          name="description"
          type="text"
          v-model="profileStore.profile.description"
          as="textarea"
          class="form-control"
          rows="4"
          cols="50"
        />
      </div>

      <div>
        <label for="name">Name:</label>
        <Field
          id="name"
          name="name"
          type="text"
          v-model="profileStore.profile.name"
          class="form-control"
        />
      </div>

      <div>
        <label for="surname">Surname:</label>
        <Field
          id="surname"
          name="surname"
          type="text"
          v-model="profileStore.profile.surname"
          class="form-control"
        />
      </div>

      <div>
        <label for="address">Address:</label>
        <Field
          id="address"
          name="address"
          type="text"
          v-model="profileStore.profile.address"
          class="form-control"
        />
      </div>

      <div>
        <label for="email">Email:</label>
        <Field
          id="email"
          name="email"
          type="email"
          v-model="profileStore.profile.email"
          class="form-control"
        />
      </div>

      <div>
        <label for="tel-number">Tel. number:</label>
        <Field
          id="tel-number"
          name="telNumber"
          type="tel"
          v-model="profileStore.profile.telNumber"
          class="form-control"
        />
      </div>

      <button
        class="btn btn-primary flex-2 rounded-pill px-5 align-self-center"
      >
        Submit
      </button>
    </Form>
  </BModal>
</template>

<style lang="css" scoped></style>
