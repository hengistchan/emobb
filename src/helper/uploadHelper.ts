import File from "@/api/file";

const uploadSingleFile = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data as Blob);
  return await File.upload(formData);
};

export { uploadSingleFile };
