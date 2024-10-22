import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { GestureEventType, Direction, Coordinate } from '../types/types'
import { FOOD_INITIAL_POSITION, SNAKE_INITIAL_POSITION, MOVE_INTERVAL, GAME_BOUNDS, SCORE_INCREMENT } from '../utils/constants'
import Snake from './Snake'
import { checkGameOver } from '../utils/CheckGameOver'
import Food from './Foods'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'
import Header from './Header'

export default function Game():JSX.Element {
  
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT) // string
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION) // Array of coords
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION) // (x,y)
  const [isGameOver, setIsGameOver] = useState<boolean>(false) // boolean
  const [isPaused, setIsPaused] = useState<boolean>(false) // boolean
  const [score, setScore] = useState<number>(0) // number

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

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)) // set another random Coordinate to Food
      setSnake([newHead, ...snake]) // increment the snake
      setScore(score + SCORE_INCREMENT)
    } else {
      setSnake([newHead, ...snake.slice(0, -1)])
    }
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

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    setDirection(Direction.RIGHT)
    setIsPaused(false)
  }

  const pauseGame = () => {
    setIsPaused(!isPaused)
  }
  
  return (
    <PanGestureHandler onGestureEvent={handlerGesture}>
      <SafeAreaView style={styles.container}>
        <Header reloadGame={reloadGame} isPaused={isPaused} pauseGame={pauseGame}>
          <Text style={styles.score}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y}></Food>
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
  },

  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary
  }
})