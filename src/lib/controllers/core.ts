import type {Event, EventType} from "@/lib/events.ts";
import {DrawHandler} from "@/lib/controllers/drawController.ts";
import {EditorContext} from "@/lib/editorContext.ts";

export interface Handler {
  eventType: EventType
  handle: (ctx: EditorContext, event: Event) => void
}

export class DispatchEventHandler {

  ctx: EditorContext
  handlers: Handler[]

  constructor(canvasCtx: CanvasRenderingContext2D, visibleWidth: number, visibleHeight: number) {
    this.ctx = new EditorContext(canvasCtx, visibleWidth, visibleHeight);
    this.handlers = [
      new DrawHandler()
    ];
  }

  dispatch(event: Event) {
    for (let handler of this.handlers) {
      if (event.name !== handler.eventType) {
        continue;
      }
      handler.handle(this.ctx, event);
    }
  }

}



