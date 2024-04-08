export interface GestureEventType {
  nativeEvent: {
    translationX: number
    translationY: number
  }
}

export interface Coordinate {
  x: number
  y: number
}

export enum Direction {
  RIGHT = 'right',
  LEFT = 'left',
  UP = 'up',
  DOWN = 'down'
}

export const MOVE_INTERVAL = 50