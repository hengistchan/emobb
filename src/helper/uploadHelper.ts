import File from "@/api/file";

/**
 * It uploads a single file to the server.
 * @param {File} data - The file to upload.
 * @returns The `uploadSingleFile` function returns a `Promise` that resolves to a `File` object.
 */
const uploadSingleFile = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data as Blob);
  return await File.upload(formData);
};

export { uploadSingleFile };
