export const defaultRowHeight = 20;
export const defaultColWeight = 24;
export const defaultRowCount = 160;
export const defaultColCount = 24;
export const defaultBorder = 1;

export class EditorContext {

  canvasCtx: CanvasRenderingContext2D
  visibleWidth: number;
  visibleHeight: number;
  rowLens: number[];
  colLens: number[];

  constructor(canvasCtx: CanvasRenderingContext2D, visibleWidth: number, visibleHeight: number) {
    this.canvasCtx = canvasCtx;
    this.visibleWidth = visibleWidth;
    this.visibleHeight = visibleHeight;
    this.rowLens = Array.from<number>({length: defaultRowCount}).fill(defaultRowHeight);
    this.colLens = Array.from<number>({length: defaultColCount}).fill(defaultColWeight);
  }


}
