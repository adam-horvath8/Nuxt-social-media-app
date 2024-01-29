import type { NuxtLink } from '#build/components';
<script lang="ts" setup>
import { Form, Field } from "vee-validate";
import type { loginValuesType } from "../../types";

const authStore = useAuthStore();
const toastStore = useToastStore();

const { loginUser, errorMessage } = useLoginUser();

const handleSubmit = async (values: Record<string, any>) => {
  const loginValues = values as loginValuesType;

  // await authStore.login(loginValues.username, loginValues.password);
  await loginUser(loginValues.username, loginValues.password);

  if (authStore.isAuth) {
    toastStore.displayToast("Succesfull Login", true);
    navigateTo("/home");
  }
};
</script>

<template>
  <Form
    @submit="handleSubmit"
    class="text-white d-flex align-items-center flex-column"
  >
    <h1 class="display-4">Login</h1>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <Field
        name="username"
        type="text"
        class="form-control"
        id="username"
        aria-describedby="usernameHelp"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        id="password"
      />
    </div>
    <div class="d-flex gap-2 align-items-center">
      <button type="submit" class="btn btn-primary">Log In</button>
      <NuxtLink to="/register" class="text-white">Register</NuxtLink>
    </div>
    <div v-if="errorMessage" class="form-text text-danger">
      {{ errorMessage }}
    </div>
  </Form>
</template>

<style lang="css" scoped></style>
