import { defineStore } from "pinia";
import { ref } from "vue";
import type { toastMessageType } from "~/types";

export const useToastStore = defineStore("toast", () => {
  const toastMessage = ref<toastMessageType | null>(null);

  const displayToast = (message: string) => {
    toastMessage.value = { message: message };
    setTimeout(() => {
      toastMessage.value = null;
    }, 3000);
  };

  return { toastMessage, displayToast };
});
