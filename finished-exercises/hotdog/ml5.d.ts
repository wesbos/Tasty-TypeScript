interface ImageClassifier {
  classify(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<ImageClassifierResult[]>
}

interface ImageClassifierResult {
  label: string,
  confidence: number
}

declare module "ml5" {
  export function imageClassifier(model: 'MobileNet', options?: any): Promise<ImageClassifier>;
}
