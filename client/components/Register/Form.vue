import type { NuxtLink } from '#build/components';
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import type { registerValuesType, errorMessageType } from "~/types";

const router = useRouter();

const errorMessage = ref<errorMessageType>();

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

    const { data: response, error } = await useFetch(
      "http://localhost:3004/auth",
      {
        method: "post",
        body: {
          username: values.username,
          password: values.password,
        },
      }
    );

    if (error.value) {
      errorMessage.value = error.value.data.error;
    }

    if (response.value) {
      router.push("/");
    }

    console.log(response.value);
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <Form :validation-schema="validationSchema" @submit="handleSubmit">
    <h1 class="display-1 mb-5">Register</h1>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <div id="usernameHelp" class="form-text">
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
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <div id="passwordHelp" class="form-text">
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
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Confirm Password</label
      >
      <div id="passwordHelp" class="form-text">Must be same as Password</div>
      <Field
        name="confirmPassword"
        type="password"
        class="form-control"
        id="confirmPassword"
      />
      <ErrorMessage name="confirmPassword" class="text-danger" />
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Register</button>
      <NuxtLink to="/">Log in</NuxtLink>
      <div v-if="errorMessage" class="form-text text-danger">
        {{ errorMessage }}
      </div>
    </div>
  </Form>
</template>

<style lang="css" scoped></style>
