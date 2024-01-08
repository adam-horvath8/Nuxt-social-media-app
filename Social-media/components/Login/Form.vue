import type { NuxtLink } from '#build/components';
<script lang="ts" setup></script>

<template>
  <form>
    <h1 class="display-1 mb-5">Login</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Log In</button>
      <NuxtLink to="/register">Register</NuxtLink>
    </div>
  </form>
</template>

<style lang="css" scoped></style>
