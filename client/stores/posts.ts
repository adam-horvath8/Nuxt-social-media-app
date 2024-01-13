import { defineStore } from "pinia";
import { ref } from "vue";
import type { postsType, toastMessageType } from "~/types";

interface Ipost {
  message: string;
  error: string;
  posts: postsType;
}

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<postsType>([]);
  const errorMessage = ref<string | undefined>();

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
        alert(error.value);
      } else if (response.value) {
        posts.value = response.value.posts;
        toastStore.displayToast(response.value.message);
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
      } else {
        posts.value = []; 
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { posts, errorMessage, getPosts, addPost };
});
