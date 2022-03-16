/**
 * It takes an object and a dot-separated property name, and returns an object with the property name,
 * the object containing the property, and a boolean indicating whether the property is a dot-separated
 * property
 * @param {any} originObj - The object that contains the property you want to access.
 * @param {any} propName - The name of the property to be retrieved.
 * @returns The `useDotProp` hook returns an object with three properties: `prop`, `propObj`, and
 * `isDotProp`.
 */
export const useDotProp = (originObj: any, propName: any) => {
  const props: string[] = propName.split(".");
  const isDotProp = props.length > 1;
  const prop = props.pop()!;
  const propObj = props.reduce((prev, curr) => (prev[curr] ??= {}), originObj);
  return {
    prop,
    propObj,
    isDotProp,
  };
};
