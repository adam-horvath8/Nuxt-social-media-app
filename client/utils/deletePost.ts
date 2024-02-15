interface fetchI {
  message: string;
}

const deletePost = async (postId: string) => {
  const toastStore = useToastStore();
  const postStore = usePostsStore();

  const router = useRouter();

  try {
    const response = await $fetch<fetchI>(`${url}/posts/${postId}`, {
      method: "delete",
    });
    postStore.deletePost(postId);
    toastStore.displayToast(response.message, true);
    router.back();
  } catch (error) {
    console.log(error);
  }
};

export default deletePost;
