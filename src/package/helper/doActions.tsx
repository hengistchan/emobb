import { Action } from "../types/component";

export const doActions = (actions: { [key: string]: Action } | undefined) => {
  actions &&
    Object.values(actions).forEach((action) => {
      eval(`(${action.code})()`);
    });
};
