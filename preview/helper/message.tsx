import { ElMessage } from "element-plus/es";
const message = (
  type: "info" | "success" | "warning" | "error",
  message: string | undefined | null,
) => {
  ElMessage({
    message: message || "error",
    type: type ?? "success",
  });
};

export default message;
