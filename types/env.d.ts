/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.ts" {
  interface ImportMeta {
    env: Record<string, unknown>;
    globEager: (path: string) => Record<string, any>;
  }
}

declare type Nullable<T> = null | T;
