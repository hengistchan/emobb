import { Action } from "../types/component";

/**
 * 执行该事件下所有的行为
 * @param actions 行为集合
 * @param obj 需要的作用域函数
 */
export const doActions = async (
  actions: { [key: string]: Action } | undefined,
  obj: any = {},
) => {
  actions &&
    Object.values(actions).forEach(async (action) => {
      await new Function(`return ${action.code}`)()(obj);
    });
};
