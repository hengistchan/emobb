export const getParentElement = (element: HTMLElement, className: string) => {
  while (element) {
    if (element.classList && element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }
  return null;
};
