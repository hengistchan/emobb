import { Icon } from "@iconify/vue";
import { DefineComponent } from "vue";
const EIcon = Icon as typeof Icon & DefineComponent<{ icon: string }>;
export default (icon: string) => <EIcon icon="mdi:card-text-outline" />;
