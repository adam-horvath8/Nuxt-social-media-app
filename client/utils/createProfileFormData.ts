export default function createProfileFormData(
  description: string,
  name: string,
  surname: string,
  address: string,
  email: string,
  telNumber: string,
  fileInput: HTMLInputElement | null
): FormData {
  const formData = new FormData();

  formData.append("description", description);
  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("address", address);
  formData.append("email", email);
  formData.append("telNumber", telNumber);

  if (fileInput.value && fileInput.value.files[0]) {
    formData.append("image", fileInput.value.files[0]);
  }

  return formData;
}
