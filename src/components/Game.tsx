import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GestureEventType, Direction, Coordinate } from '../types/types'
import { FOOD_INITIAL_POSITION, SNAKE_INITIAL_POSITION } from '../utils/constants'
import Snake from './Snake'

export default function Game():JSX.Element {
  
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT) // string
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION) // Array of coords
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION) // (x,y)
  const [isGameOver, setIsGameOver] = useState<boolean>(false) // boolean
  const [isPaused, setIsPaused] = useState<boolean>(false) // boolean

  const handlerGesture = (event: GestureEventType) => {
    // console.log(event.nativeEvent)
    const { translationX, translationY } = event.nativeEvent

    // X Axis:
    if(Math.abs(translationX) > Math.abs(translationY)) {
      if(translationX > 0) {
        setDirection(Direction.RIGHT)
      } else {
        setDirection(Direction.LEFT)
      }
    } else {
      if(translationY > 0) {
        setDirection(Direction.DOWN)
      } else {
        setDirection(Direction.UP)
      }
    }

  }
  
  return (
    <PanGestureHandler onGestureEvent={handlerGesture}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },

  boundaries: {
    flex: 1,
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})