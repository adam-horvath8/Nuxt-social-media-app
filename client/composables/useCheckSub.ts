interface fetchI {
  isSubscribed: boolean;
}

const useCheckSub = async (subscribedToId: string, subscriberId: string) => {
  if (!subscriberId) {
    return false;
  }
  try {
    const response = await $fetch<fetchI>(
      `${url}/subscription/check?subscriberId=${encodeURIComponent(
        subscriberId
      )}&subscribedToId=${encodeURIComponent(subscribedToId)}`
    );

    if (response) {
      return response.isSubscribed;
    }
  } catch (error) {
    console.log(error);
  }
};

export default useCheckSub;
