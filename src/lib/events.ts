export type EventType = 'draw'
export type Event = {
  name: EventType
}

export function createDrawEvent(): Event {
  return {
    name: 'draw'
  }
}
