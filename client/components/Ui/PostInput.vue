<script lang="ts" setup>
import { Form, Field } from "vee-validate";

interface PropsI {
  isComment?: boolean;
  postId?: string;
}

const fileInput = ref();
const textInput = ref("");
const fileName = ref("");

const { fetchPost } = useFetchPost();

const authStore = useAuthStore();
const toastStore = useToastStore();

const { isComment, postId } = defineProps<PropsI>();

const emit = defineEmits(["close:modal"]);

const handleSubmit = async (values: Record<string, any>) => {
  if (!authStore.currentUser) {
    toastStore.displayToast("You need to be logged in!", true);
    return;
  }

  if (values.post || (fileInput.value && fileInput.value.files[0])) {
    const formData = createPostFormData(
      values.post,
      authStore.currentUser?.id,
      fileInput.value,
      isComment,
      postId
    );

    await fetchPost(formData);

    fileName.value = "";

    textInput.value = "";

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    emit("close:modal");
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
  <Form @submit="handleSubmit" class="p-3 bg-white card rounded-0">
    <Field
      name="post"
      v-model="textInput"
      type="text"
      class="form-control mb-2"
      placeholder="What is on your mind?"
      autocomlete="nope"
    />
    <div class="d-flex justify-content-between">
      <input
        name="image"
        type="file"
        class="d-none"
        ref="fileInput"
        @change="handleFileChange"
      />
      <div class="d-flex align-items-center">
        <button
          type="button"
          @click="triggerFileInput"
          class="btn btn-outline-primary mr-2"
        >
          <i class="bi bi-image"></i>
        </button>

        <span v-if="fileName" class="file-name">{{ fileName }}</span>
      </div>

      <button class="btn btn-primary flex-2 rounded-pill px-5">Post</button>
    </div>
  </Form>
</template>

<style lang="css" scoped>
.file-name {
  max-width: 80px; /* Adjust this value as needed */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block; /* This ensures the element respects the max-width */
}
</style>
