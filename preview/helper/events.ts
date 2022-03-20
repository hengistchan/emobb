export const emit = (label: string) => {
  const image = new Image();
  image.src = `http://81.69.58.208:8083/event.gif?label=${label}&time=${new Date().getTime()}`;
};
