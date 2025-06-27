import type {Handler} from "@/lib/controllers/core.ts";
import type {Event, EventType} from "@/lib/events.ts";
import type {EditorContext} from "@/lib/editorContext.ts";
import {defaultBorder} from "@/lib/editorContext.ts";

export class DrawHandler implements Handler {
  eventType: EventType = 'draw';

  handle(ctx: EditorContext, event: Event) {
    const canvasCtx = ctx.canvasCtx;
    let currentIndex = 20;
    for (let rowLen of ctx.rowLens) {
      currentIndex += rowLen + defaultBorder;
      canvasCtx.beginPath()
      canvasCtx.moveTo(20, currentIndex);
      canvasCtx.lineTo(ctx.visibleWidth, currentIndex);
      canvasCtx.strokeStyle = 'gray';
      canvasCtx.lineWidth = 1;
      canvasCtx.stroke()
    }
    currentIndex = 20;
    for (let colLen of ctx.colLens) {
      currentIndex += colLen + defaultBorder;
      canvasCtx.beginPath()
      canvasCtx.moveTo(currentIndex, 20);
      canvasCtx.lineTo(currentIndex, ctx.visibleHeight);
      canvasCtx.strokeStyle = 'gray';
      canvasCtx.lineWidth = 1;
      canvasCtx.stroke()
    }
    this.drawRowHandle(ctx);
    this.drawColHandle(ctx);
  }

  drawRowHandle(ctx: EditorContext) {
    const canvasCtx = ctx.canvasCtx;
    let currentIndex = 20;
    let rowIndex = 0;
    for (let rowLen of ctx.rowLens) {
      const start = currentIndex;
      currentIndex += rowLen + defaultBorder;
      canvasCtx.beginPath()
      canvasCtx.moveTo(0, currentIndex);
      canvasCtx.lineTo(20, currentIndex);
      canvasCtx.strokeStyle = 'gray';
      canvasCtx.lineWidth = 1;
      canvasCtx.stroke()
      canvasCtx.fillText(String(rowIndex + 1), 4, start + rowLen);
      rowIndex++;
    }
  }

  drawColHandle(ctx: EditorContext) {
    const canvasCtx = ctx.canvasCtx;
    let currentIndex = 20;
    let colIndex = 0;
    for (let colLen of ctx.colLens) {
      const start = currentIndex;
      currentIndex += colLen + defaultBorder;
      canvasCtx.beginPath()
      canvasCtx.moveTo(0, currentIndex);
      canvasCtx.lineTo(20, currentIndex);
      canvasCtx.strokeStyle = 'gray';
      canvasCtx.lineWidth = 1;
      canvasCtx.stroke()
      canvasCtx.fillText(String(colIndex + 1), start + colLen, 16, 64);
      colIndex++;
    }
  }

}
