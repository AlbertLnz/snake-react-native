import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Colors } from '../styles/colors'
import { PanGestureHandler } from 'react-native-gesture-handler'

export default function Game():JSX.Element {
  
  const handlerGesture = (event: any) => {
    console.log(event.nativeEvent)
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