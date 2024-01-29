const fetchPosts = async (formData: FormData) => {
  const toastStore = useToastStore();
  const postsStore = usePostsStore();

  try {
    const { data: response, error } = await useFetch<Ipost>(`${url}/posts`, {
      method: "post",
      body: formData,
    });

    if (error.value) {
      toastStore.displayToast(error.value.data, false);
    } else if (response.value) {
      postsStore.addPost(response.value.post);
      toastStore.displayToast(response.value.message, true);
    }
  } catch (error) {
    console.error(error);
  }
};

export default fetchPosts;
