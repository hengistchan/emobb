import { Icon } from "@iconify/vue";
import { ElIcon } from "element-plus";
import { DefineComponent } from "vue";
const EIcon = Icon as typeof Icon &
  DefineComponent<{ icon: string; size?: number }>;
export default (icon: string, size?: number, color?: string) => (
  <ElIcon size={size ?? 20} color={color ?? "inherit"}>
    <EIcon icon={icon} />
  </ElIcon>
);
