import { defineStore } from "pinia";
import type { postsType } from "~/types";
import { url } from "~/utils/url";

interface CheckSubscriptionResponse {
  isSubscribed: boolean;
}

export const useSubsStore = defineStore("subs", () => {
  const subsPosts = ref();

  const setSubsPosts = (subPosts: postsType) => {
    subsPosts.value = subPosts;
  };

  const addSubscription = async (
    subscribedToId: string,
    subscriberId: string
  ) => {
    try {
      const { data: response, error } = await useFetch(`${url}/subscription`, {
        method: "post",
        body: {
          subscriberId: subscriberId,
          subscribedToId: subscribedToId,
        },
      });

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

  const deleteSubscription = async (
    subscribedToId: string,
    subscriberId: string
  ) => {
    try {
      const { data: response, error } = await useFetch(`${url}/subscription`, {
        method: "delete",
        body: {
          subscriberId: subscriberId,
          subscribedToId: subscribedToId,
        },
      });

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

  const checkSubscription = async (
    subscribedToId: string,
    subscriberId: string
  ) => {
    if (!subscriberId) {
      return false;
    }

    try {
      const { data: response, error } =
        await useFetch<CheckSubscriptionResponse>(
          `${url}/subscription/check?subscriberId=${encodeURIComponent(
            subscriberId
          )}&subscribedToId=${encodeURIComponent(subscribedToId)}`
        );

      if (error.value) {
        console.error(error.value.data);
        return false;
      }
      return response.value?.isSubscribed;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateLikesCount = (postId: string, increment?: boolean) => {
    const foundPost = subsPosts.value.find((p: any) => p.id === postId);
    if (foundPost) {
      if (increment) {
        foundPost.likesCount++;
      } else {
        foundPost.likesCount--;
      }
      subsPosts.value = [...subsPosts.value]; // Ensure reactivity
    }
  };

  return {
    subsPosts,
    setSubsPosts,
    addSubscription,
    deleteSubscription,
    checkSubscription,
    updateLikesCount,
  };
});
