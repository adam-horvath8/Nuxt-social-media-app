import { defineStore } from "pinia";
import { ref } from "vue";
import type { toastMessageType } from "~/types";

export const useToastStore = defineStore("toast", () => {
  const toastMessage = ref<toastMessageType | null>(null);
  const isSuccess = ref<boolean>(true);

  const displayToast = (message: string, success: boolean) => {
    toastMessage.value = { message: message };
    isSuccess.value = success;
    setTimeout(() => {
      toastMessage.value = null;
    }, 3000);
  };

  return { toastMessage, displayToast, isSuccess };
});
