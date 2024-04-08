import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GestureEventType, Direction, Coordinate } from '../types/types'
import { FOOD_INITIAL_POSITION, SNAKE_INITIAL_POSITION, MOVE_INTERVAL, GAME_BOUNDS } from '../utils/constants'
import Snake from './Snake'
import { checkGameOver } from '../utils/CheckGameOver'

export default function Game():JSX.Element {
  
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT) // string
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION) // Array of coords
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION) // (x,y)
  const [isGameOver, setIsGameOver] = useState<boolean>(false) // boolean
  const [isPaused, setIsPaused] = useState<boolean>(false) // boolean

  useEffect(() => {
    if(!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake()
      }, MOVE_INTERVAL)

      return () => clearInterval(intervalId)
    }
  }, [snake, isGameOver, isPaused])
  

  const moveSnake = () => {
    const snakeHead = snake[0]
    const newHead = { ...snakeHead } // creating a copy of 'snakeHead'

    if(checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(true)
      return
    }

    switch (direction) {
      case Direction.UP:
        newHead.y -= 1; break;
      case Direction.DOWN:
        newHead.y += 1; break;
      case Direction.LEFT:
        newHead.x -= 1; break;
      case Direction.RIGHT:
        newHead.x += 1; break;
      default: break;
    }

    setSnake([newHead, ...snake.slice(0, -1)])
  }

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