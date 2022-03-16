import { ElMessage } from "element-plus/es";
/**
 * It displays a message to the user.
 * @param {"info" | "success" | "warning" | "error"} type - The type of message to display.
 * @param {string | undefined | null} message - The message to display.
 */
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
