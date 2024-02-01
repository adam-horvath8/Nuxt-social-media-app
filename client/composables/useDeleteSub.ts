interface FetchI {
  message: string;
}

const useDeleteSub = async (subscribedToId: string, subscriberId: string) => {
  try {
    const response = await $fetch<FetchI>(`${url}/subscription`, {
      method: "delete",
      body: {
        subscriberId: subscriberId,
        subscribedToId: subscribedToId,
      },
    });

    if (response) {
      console.log(response.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export default useDeleteSub;
