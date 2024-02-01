import type { postsType } from "~/types";

const useGetPosts = () => {
  const isLoading = ref<boolean>(false);

  const postsStore = usePostsStore();

  const getPosts = async () => {
    try {
      isLoading.value = true;

      const response = await $fetch(`${url}/posts`);

      if (response && Array.isArray(response)) {
        postsStore.setPosts(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { getPosts, isLoading };
};

export default useGetPosts;
