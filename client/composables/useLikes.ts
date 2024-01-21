
interface FetchLikeI {
  message: string;
  isLiked: boolean;
}

export const useLikes = () => {
  const isLiked = ref<boolean>();


  const toggleLike = async (userId: string, postId: string) => {
    try {
      const { data: response, error } = await useFetch<FetchLikeI>(
        "http://localhost:3004/like",
        {
          method: "post",
          body: {
            userId: userId,
            postId: postId,
          },
        }
      );

      if (error.value) {
        console.log(error.value.data);
      }
      if (response.value) {
        console.log(response.value.message);
        console.log("isLiked", response.value.isLiked);
        isLiked.value = response.value.isLiked;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkLiked = async (userId: string, postId: string) => {
    try {
      const { data: response, error } = await useFetch<FetchLikeI>(
        `http://localhost:3004/like/check?userId=${encodeURIComponent(
          userId
        )}&postId=${encodeURIComponent(postId)}`
      );

      if (error.value) {
        console.error(error.value.data);
        isLiked.value = false;
      } else if (response.value) {
        isLiked.value = response.value.isLiked;
      }
    } catch (error) {
      console.error(error);
      isLiked.value = false;
    }
  };
  return {
    toggleLike,
    checkLiked,
    isLiked,
  };
};
