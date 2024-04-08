import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GestureEventType, Direction, Coordinate } from '../types/types'
import { SNAKE_INITIAL_POSITION } from '../utils/constants'

export default function Game():JSX.Element {
  
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT) // 
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION) // Array of coords

  const handlerGesture = (event: GestureEventType) => {
    // console.log(event.nativeEvent)
    const { translationX, translationY } = event.nativeEvent

    // X Axis:
    if(Math.abs(translationX) > Math.abs(translationY)) {
      if(translationX > 0) {
        // moving right
      } else {
        // moving left
      }
    } else {
      if(translationY > 0) {
        // Moving down:
      } else {
        // Moving up
      }
    }

  }
  
  return (
    <PanGestureHandler onGestureEvent={handlerGesture}>
      <SafeAreaView style={styles.container}></SafeAreaView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
})