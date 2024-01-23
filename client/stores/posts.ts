import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { postType, postsType } from "~/types";
import { url } from "~/utils/url";

interface Ipost {
  message: string;
  error: string;
  post: postType;
}

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<postsType>([]);
  const currentPostId = ref("");
  const errorMessage = ref<string | undefined>();
  const userId = ref("");

  const toastStore = useToastStore();

  const addPost = async (formData: FormData) => {
    try {
      const { data: response, error } = await useFetch<Ipost>(`${url}/posts`, {
        method: "post",
        body: formData,
      });

      if (error.value) {
        toastStore.displayToast(error.value.data, false);
      } else if (response.value) {
        posts.value.push(response.value.post);
        toastStore.displayToast(response.value.message, true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const { data: response, error } = await useFetch(`${url}/posts`);

      if (error.value) {
        errorMessage.value = error.value?.data.error;
      } else if (response.value && Array.isArray(response.value)) {
        posts.value = response.value;
        console.log(posts.value);
      } else {
        posts.value = [];
      }
    } catch (err) {
      console.error(err);
    }
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
    errorMessage,
    getPosts,
    addPost,
    setUserId,
    filteredProfilePosts,
    filteredPosts,
    post,
    commentPosts,
    setCurrentPostId,
    updateLikesCount,
  };
});
