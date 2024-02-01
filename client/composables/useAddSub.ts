interface fetchI {
  message: string;
}

const useAddSub = async (subscribedToId: string, subscriberId: string) => {
  try {
    const response = await $fetch<fetchI>(`${url}/subscription`, {
      method: "post",
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

export default useAddSub;
