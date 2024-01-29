export default function createPostFormData(
  text: string,
  userId: string,
  fileInput: HTMLInputElement | null,
  isComment: boolean = false,
  postId: string = ""
): FormData {
  const formData = new FormData();

  formData.append("text", text);
  formData.append("userId", userId);

  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append("image", fileInput.files[0]);
  }

  if (isComment && postId) {
    formData.append("replyToId", postId);
  }

  return formData;
}
