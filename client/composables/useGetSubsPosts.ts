import type { postsType } from "~/types";

interface fetchI {
  posts: postsType;
}

const useGetSubsPosts = () => {
  const isLoading = ref(false);

  const subsStore = useSubsStore();

  const getSubsPosts = async (userId: string) => {
    try {
      isLoading.value = true;
      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const response = await $fetch<fetchI>(
        `${url}/subscription?userId=${encodeURIComponent(userId)}`
      );

      if (response) {
        subsStore.setSubsPosts(response.posts);
      }
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };

  return { getSubsPosts, isLoading };
};

export default useGetSubsPosts;
