import type { NuxtLink } from '#build/components';
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import type { registerValuesType, errorMessageType } from "~/types";
import { url } from "~/utils/url";

const router = useRouter();

const errorMessage = ref<errorMessageType>();
const isLoading = ref(false);

const toastStore = useToastStore();

const validationSchema = toTypedSchema(
  zod.object({
    username: zod
      .string()
      .min(4, { message: "Must be at least 4 characters long" })
      .max(15, { message: "Can't be longer than 15 characters" }),
    password: zod
      .string()
      .min(6, { message: "Must be at least 6 characters long" })
      .max(20, { message: "Can't be longer than 20 characters" }),
    confirmPassword: zod.string(),
  })
);

const handleSubmit = async (values: Record<string, any>) => {
  const registerValues = values as registerValuesType;

  try {
    if (registerValues.password !== registerValues.confirmPassword) {
      errorMessage.value = "Passwords do not match";
      throw new Error("Passwords do not match");
    }

    isLoading.value = true;

    const { data: response, error } = await useFetch(`${url}/auth`, {
      method: "post",
      body: {
        username: values.username,
        password: values.password,
      },
    });

    if (error.value) {
      errorMessage.value = error.value.data.error;
    }

    if (response.value) {
      toastStore.displayToast("Successful Registration", true);
      router.push("/");
    }

    console.log(response.value);
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Form
    :validation-schema="validationSchema"
    @submit="handleSubmit"
    class="text-white d-flex flex-column align-items-center"
  >
    <h1 class="display-5">Register</h1>
    <div class="mb-2">
      <label for="username" class="form-label m-0">Username</label>
      <div id="usernameHelp" class="form-text text-white m-0">
        Must be 4 to 15 characters long
      </div>
      <Field
        name="username"
        type="text"
        class="form-control"
        id="username"
        aria-describedby="usernameHelp"
      />
      <ErrorMessage name="username" class="text-danger" />
    </div>
    <div>
      <div class="mb-2">
        <label for="password" class="form-label m-0">Password</label>
        <div id="passwordHelp" class="form-text text-white m-0">
          Must be 6 to 20 characters long
        </div>
        <Field
          name="password"
          type="password"
          class="form-control"
          id="password"
        />
        <ErrorMessage name="password" class="text-danger" />
      </div>
      <div class="mb-2">
        <label for="exampleInputPassword1" class="form-label m-0"
          >Confirm Password</label
        >
        <div id="passwordHelp" class="form-text text-white m-0">
          Must be same as Password
        </div>
        <Field
          name="confirmPassword"
          type="password"
          class="form-control"
          id="confirmPassword"
        />
        <ErrorMessage name="confirmPassword" class="text-danger" />
      </div>
    </div>

    <div>
      <div class="d-flex gap-2 align-items-center">
        <BButton v-if="isLoading" variant="primary" disabled>
          <BSpinner small />
          Loading...
        </BButton>
        <BButton v-else variant="primary" type="submit"> Register </BButton>
        <NuxtLink to="/" class="text-white">Log in</NuxtLink>
      </div>

      <div v-if="errorMessage" class="form-text text-danger">
        {{ errorMessage }}
      </div>
    </div>
  </Form>
</template>

<style lang="css" scoped></style>
