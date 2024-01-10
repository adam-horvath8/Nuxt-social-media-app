import type { NuxtLink } from '#build/components';
<script lang="ts" setup>
import { Form, Field } from "vee-validate";
import type { errorMessageType, loginValuesType } from "../../types";

const authStore = useAuthStore();

const router = useRouter();

const errorMessage = ref<errorMessageType>("");

const handleSubmit = async (values: Record<string, any>) => {
  const loginValues = values as loginValuesType;
  await authStore.login(loginValues.username, loginValues.password);
  errorMessage.value = authStore.errorMessage;
  router.push("/home");
};
</script>

<template>
  <Form @submit="handleSubmit">
    <h1 class="display-1 mb-5">Login</h1>
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
    <div>
      <button type="submit" class="btn btn-primary">Log In</button>
      <NuxtLink to="/register">Register</NuxtLink>
    </div>
    <div v-if="errorMessage" class="form-text text-danger">
      {{ errorMessage }}
    </div>
  </Form>
</template>

<style lang="css" scoped></style>
