import { defineStore } from "pinia";

interface CheckSubscriptionResponse {
  isSubscribed: boolean;
}

export const useSubsStore = defineStore("subs", () => {
  const subsPosts = ref();

  const authStore = useAuthStore();

  const userId = authStore.currentUser?.id;
  const getSubsPosts = async () => {
    try {

      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const { data: response, error } = await useFetch(
        `http://localhost:3004/subscription?userId=${encodeURIComponent(
          userId
        )}`
      );

      if (error.value) {
        throw new Error(error.value.data);
      }
      if (response.value) {
        subsPosts.value = response.value;
        console.log(subsPosts.value);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSubscription = async (subscribedToId: string) => {
    try {
      const { data: response, error } = await useFetch(
        "http://localhost:3004/subscription",
        {
          method: "post",
          body: {
            subscriberId: authStore.currentUser?.id,
            subscribedToId: subscribedToId,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.data);
      }
      if (response.value) {
        console.log(response.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscription = async (subscribedToId: string) => {
    try {
      const { data: response, error } = await useFetch(
        "http://localhost:3004/subscription",
        {
          method: "delete",
          body: {
            subscriberId: authStore.currentUser?.id,
            subscribedToId: subscribedToId,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.data);
      }
      if (response.value) {
        console.log(response.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkSubscription = async (subscribedToId: string) => {
    if (!userId) {
      return false;
    }

    try {
      const { data: response, error } = await useFetch<CheckSubscriptionResponse>(
        `http://localhost:3004/subscription/check?subscriberId=${encodeURIComponent(userId)}&subscribedToId=${encodeURIComponent(subscribedToId)}`
      );

      if (error.value) {
        console.error(error.value.data);
        return false;
      }
      return response.value?.isSubscribed
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  return { subsPosts, getSubsPosts, addSubscription, deleteSubscription, checkSubscription };
});
