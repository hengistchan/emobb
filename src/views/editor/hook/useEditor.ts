import { Page } from "@/package/types/page.d";

export const createNewPage = ({ title = "页面" }): Page => ({
  title,
  props: {
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  components: [],
});