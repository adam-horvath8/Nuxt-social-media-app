import type { postType } from "~/types";

interface Ipost {
  message: string;
  error: string;
  post: postType;
}

const useFetchPost = () => {
  const fetchPost = async (formData: FormData) => {
    const toastStore = useToastStore();
    const postsStore = usePostsStore();

    try {
      const response = await $fetch<Ipost>(`${url}/posts`, {
        method: "post",
        body: formData,
      });

      if (response.error) {
        toastStore.displayToast(response.error, false);
      }

      if (response) {
        postsStore.addPost(response.post);
        toastStore.displayToast(response.message, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchPost };
};

export default useFetchPost;
