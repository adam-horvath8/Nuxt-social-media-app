<script lang="ts" setup>
import { Form, Field } from "vee-validate";

const fileInput = ref();
const fileName = ref("");

console.log(fileInput.value);

const authStore = useAuthStore();
const postsStore = usePostsStore();

const handleSubmit = async (values: Record<string, any>) => {
  if (!authStore.currentUser) {
    alert("No current user found");
    // Handle this case as per your application's logic
    return;
  }

  const formData = new FormData();

  formData.append("text", values.post);
  formData.append("userId", authStore.currentUser?.id);

  // Check if a file was selected and append it to the form data
  if (fileInput.value && fileInput.value.files[0]) {
    formData.append("image", fileInput.value.files[0]);
  }

  postsStore.addPost(formData);
  fileName.value = "";
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
  <div>
    <Form @submit="handleSubmit" class="">
      <Field name="post" type="text" class="form-control" />
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

        <button class="btn btn-primary flex-2">Post</button>
      </div>
    </Form>
  </div>
</template>

<style lang="css" scoped></style>
