<script lang="ts" setup>
import { Form, Field } from "vee-validate";

const fileInput = ref();
const textInput = ref("");
const fileName = ref("");

const authStore = useAuthStore();
const postsStore = usePostsStore();
const toastStore = useToastStore();

const handleSubmit = async (values: Record<string, any>) => {
  if (!authStore.currentUser) {
    toastStore.displayToast("You need to be logged in!", true);
    return;
  }

  const formData = new FormData();

  formData.append("text", values.post);
  formData.append("userId", authStore.currentUser?.id);

  if (fileInput.value && fileInput.value.files[0]) {
    formData.append("image", fileInput.value.files[0]);
  }

  if (values.post || fileInput.value.files[0]) {
    postsStore.addPost(formData);
    fileName.value = "";
    textInput.value = "";
  } else {
    toastStore.displayToast("Post input is empty", false);
  }
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
  <div class="card p-2 py-3 rounded-0">
    <Form @submit="handleSubmit">
      <Field
        name="post"
        v-model="textInput"
        type="text"
        class="form-control mb-2"
        placeholder="What is on your mind?"
      />
      <div class="d-flex justify-content-between">
        <input
          name="image"
          type="file"
          class="d-none"
          ref="fileInput"
          @change="handleFileChange"
        />
        <div>
          <button
            type="button"
            @click="triggerFileInput"
            class="btn btn-outline-primary mr-2"
          >
            <i class="bi bi-image"></i>
          </button>
          <span v-if="fileName">{{ fileName }}</span>
        </div>

        <button class="btn btn-primary flex-2 rounded-pill px-5">Post</button>
      </div>
    </Form>
  </div>
</template>

<style lang="css" scoped></style>
