<script lang="ts" setup>
import type { postType } from "~/types";
import {
  formatDistanceToNowStrict,
  format,
  differenceInHours,
  getYear,
} from "date-fns";

const { post } = defineProps<{
  post: postType;
}>();

const postDate = new Date(post.createdAt);
const now = new Date();

const hoursDifference = differenceInHours(now, postDate);
const isCurrentYear = getYear(postDate) === getYear(now);

const dateFormat = isCurrentYear ? "d. M." : "d.M.yyyy";

const result =
  hoursDifference < 24
    ? formatDistanceToNowStrict(postDate, { addSuffix: true })
    : format(postDate, dateFormat);
</script>

<template>
  <div class="d-flex align-items-center small">{{ result }}</div>
</template>

<style lang="css" scoped></style>
