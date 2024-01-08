import type { NuxtLink } from '#build/components';
<script lang="ts" setup></script>

<template>
  <form>
    <h1 class="display-1 mb-5">Register</h1>
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <div id="usernameHelp" class="form-text">
        Must be 4 to 15 characters long
      </div>
      <input
        type="text"
        class="form-control"
        id="username"
        aria-describedby="usernameHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <div id="passwordHelp" class="form-text">
        Must be 6 to 20 characters long
      </div>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Confirm Password</label
      >
      <div id="passwordHelp" class="form-text">Must be same as Password</div>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Register</button>
      <NuxtLink to="/">Log in</NuxtLink>
    </div>
  </form>
</template>

<style lang="css" scoped></style>
