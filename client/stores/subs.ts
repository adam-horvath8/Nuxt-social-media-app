import { defineStore } from "pinia";
import type { postsType } from "~/types";

export const useSubsStore = defineStore("subs", () => {
  const subsPosts = ref();

  const setSubsPosts = (subPosts: postsType) => {
    subsPosts.value = subPosts;
  };

  const updateLikesCount = (postId: string, increment?: boolean) => {
    const foundPost = subsPosts.value.find((p: any) => p.id === postId);
    if (foundPost) {
      if (increment) {
        foundPost.likesCount++;
      } else {
        foundPost.likesCount--;
      }
      subsPosts.value = [...subsPosts.value]; // Ensure reactivity
    }
  };

  return {
    subsPosts,
    setSubsPosts,
    updateLikesCount,
  };
});
