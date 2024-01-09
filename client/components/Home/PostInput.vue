<script lang="ts" setup>
import { Form, Field } from "vee-validate";

const handleSubmit = () =>{}
</script>

<template>
  <div>
    <Form @submit="handleSubmit" class="input-group">
      <Field name="post" type="text" class="form-control"/>
      <button class="btn btn-primary">Post</button>
    </Form>
  </div>
</template>

<style lang="css" scoped></style>
