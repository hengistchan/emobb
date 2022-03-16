import domtoimage from "dom-to-image";

/**
 * Convert a DOM element to a PNG image
 * @param {HTMLElement | null} el - The element to convert to an image.
 * @returns A promise that resolves to a buffer.
 */
const domtoimg = async (el: HTMLElement | null) => {
  if (el == null) return null;
  return await domtoimage.toPng(el);
};

/**
 * Convert a Blob to a File
 * @param {Blob} blob - The screenshot data.
 * @returns A promise that resolves to a File object.
 */
export const blobToFile = async (blob: Blob) => {
  return new File([blob], "screenshot.png", { type: blob.type });
};

/**
 * Convert a Blob to a Data URL
 * @param {Blob} blob - The blob to convert to a data URL.
 * @returns The data URL of the image.
 */
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

/**
 * Convert a base64 string to an image
 * @param {string} base64 - The base64 encoded image data.
 * @returns The image object.
 */
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
