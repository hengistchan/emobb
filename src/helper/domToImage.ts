import domtoimage from "dom-to-image";

const domtoimg = async (el: HTMLElement | null) => {
  if (el == null) return null;
  return await domtoimage.toPng(el);
};

export default domtoimg;
