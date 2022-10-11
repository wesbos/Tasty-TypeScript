async function getImageData(media: HTMLImageElement | HTMLVideoElement, canvas: HTMLCanvasElement): Promise<ImageData> {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(media, 0, 0);
  return ctx.getImageData(0, 0, media.width, media.height);
};
