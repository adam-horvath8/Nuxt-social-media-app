interface FetchI {
  count: number;
}

export const useCommentsCount = () => {
  const count = ref<number>(0);

  const getCount = async (postId: string) => {
    try {
      const { data: response, error } = await useFetch<FetchI>(
        `http://localhost:3004/posts/comments/count/${postId}`
      );
      if (error.value) {
        console.log(error.value.data);
      }
      if (response.value) {
        count.value = response.value.count;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getCount, count };
};
