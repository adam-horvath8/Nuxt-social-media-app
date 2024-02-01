interface FetchI {
  count: number;
}

export const useCommentsCount = () => {
  const count = ref<number>(0);

  const getCount = async (postId: string) => {
    try {
      const response = await $fetch<FetchI>(
        `${url}/posts/comments/count/${postId}`
      );

      if (response) {
        count.value = response.count;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getCount, count };
};
