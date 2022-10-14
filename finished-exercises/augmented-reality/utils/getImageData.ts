export function getImageData(
  media: HTMLImageElement | HTMLVideoElement,
  canvas: HTMLCanvasElement
): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  ctx.drawImage(media, 0, 0);
  return ctx.getImageData(0, 0, media.width, media.height);
}
