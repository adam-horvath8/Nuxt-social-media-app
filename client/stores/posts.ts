import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { postsType } from "~/types";

interface Ipost {
  message: string;
  error: string;
  posts: postsType;
}

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<postsType>([]);
  const currentPostId = ref("");
  const errorMessage = ref<string | undefined>();
  const userId = ref("");

  const toastStore = useToastStore();

  const addPost = async (formData: FormData) => {
    try {
      const { data: response, error } = await useFetch<Ipost>(
        "http://localhost:3004/posts",
        {
          method: "post",
          body: formData,
        }
      );

      if (error.value) {
        toastStore.displayToast(error.value.data, false);
      } else if (response.value) {
        posts.value = response.value.posts;
        toastStore.displayToast(response.value.message, true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const { data: response, error } = await useFetch(
        "http://localhost:3004/posts"
      );

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

  const filteredPosts = computed(() => {
    return posts.value.filter(
      (post) => post.userId === userId.value && post.replytoId === null
    );
  });

  const reversePosts = computed(() => {
    return [...posts.value].reverse();
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

  return {
    posts: reversePosts,
    errorMessage,
    getPosts,
    addPost,
    setUserId,
    filteredPosts,
    post,
    commentPosts,
    setCurrentPostId,
  };
});
