// @ts-ignore
await import("jimp/browser/lib/jimp.js"); // This statement loads the browser version of Jimp and makes it available as the global variable `window.Jimp`.
const { Jimp } = window as typeof window & { Jimp: any }; // any can probably be replaced with something else from the Jimp package
export default async function editImage(
  imageSrc: string,
  cropOptions: { width: number; height: number; x: number; y: number },
  rotation: number,
) {
    const currImage = await Jimp.read(imageSrc);
    currImage.rotate(rotation);
    currImage.crop(cropOptions.x, cropOptions.y, cropOptions.width, cropOptions.height);
    return currImage.getBase64Async(Jimp.MIME_PNG);
}
