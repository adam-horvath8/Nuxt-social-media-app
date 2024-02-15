import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { postType, postsType } from "~/types";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<postsType>([]);
  const currentPostId = ref("");
  const userId = ref("");

  const addPost = (post: postType) => {
    posts.value.push(post);
  };

  const deletePost = (postId: string) => {
    posts.value.filter((post) => post.id !== postId);
  };

  const setPosts = (newPosts: postsType) => {
    posts.value = newPosts;
  };

  const setUserId = (id: string) => {
    userId.value = id;
  };

  const setCurrentPostId = (id: string) => {
    currentPostId.value = id;
  };

  const filteredProfilePosts = computed(() => {
    return posts.value.filter(
      (post) => post.userId === userId.value && post.replytoId === null
    );
  });

  const filteredPosts = computed(() => {
    const filtered = posts.value.filter((post) => post.replytoId === null);
    return filtered.reverse();
  });

  const commentPosts = computed(() => {
    return posts.value
      .filter((post) => post.replytoId === currentPostId.value)
      .reverse();
  });

  const post = () => {
    const post = computed(() =>
      posts.value.find((post) => post.id === currentPostId.value)
    );
    return post.value;
  };

  const updateLikesCount = (postId: string, increment?: boolean) => {
    const foundPost = posts.value.find((p) => p.id === postId);
    if (foundPost) {
      if (increment) {
        foundPost.likesCount++;
      } else {
        foundPost.likesCount--;
      }
      posts.value = [...posts.value]; // Ensure reactivity
    }
  };

  return {
    posts,
    setPosts,
    addPost,
    setUserId,
    filteredProfilePosts,
    filteredPosts,
    post,
    commentPosts,
    setCurrentPostId,
    updateLikesCount,
    deletePost,
  };
});
