import { ElMessage } from "element-plus/es";
const message = (
  type: "info" | "success" | "warning" | "error",
  message: string,
) => {
  ElMessage({
    message: message,
    type: type ?? "success",
  });
};

export default message;
