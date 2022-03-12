import domtoimage from "dom-to-image";

const domtoimg = async (el: HTMLElement | null) => {
  if (el == null) return null;
  return await domtoimage.toPng(el);
};

export const blobToFile = async (blob: Blob) => {
  return new File([blob], "screenshot.png", { type: blob.type });
};

export const blobToDataUrl = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const file = new FileReader();
    file.readAsDataURL(blob);
    file.onload = function (ev) {
      resolve(ev);
    };
    file.onerror = function (ev) {
      reject(ev);
    };
  });
};

export const base64ToImage = async (base64: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = function (ev) {
      resolve(image);
    };
    image.onerror = function (ev) {
      reject(ev);
    };
  });
};

export default domtoimg;
