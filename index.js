// @flow

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native'

const Y = Dimensions.get('window').height

export type EmojiDropProps = {
  emoji: string
}

export type EmojiRainProps = {
  count?: number
} & EmojiDropProps

function drops(count: number = 25, props: EmojiDropProps) {
  const list = []
  for (let i = 0; i < count; i++) {
    list.push(<EmojiDrop key={i} {...props} />)
  }
  return list
}

export function EmojiRain(props: EmojiRainProps) {
  return (
    <View style={styles.container} pointerEvents="none">
      {drops(props.count, props)}
    </View>
  )
}

export function useDropAnimation() {
  const [animated] = useState(new Animated.Value(0))
  const [style] = useState({
    position: 'absolute',
    top: 0, left: `${Math.random() * 100}%`
  })
  const [scale] = useState(1.2 + Math.random())
  function animation() {
    Animated.timing(animated, {
      toValue: 1,
      delay: Math.round(Math.random() * 2500),
      duration: 2500 + Math.round(Math.random() * 3000),
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start()
  }
  useEffect(animation, [1])
  return {
    ...style,
    transform: [{
      translateY: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, Y + 50]
      }),
    }, { scale }]
  }
}

function EmojiDrop(props: EmojiDropProps) {
  const style = useDropAnimation()
  return <Animated.Text style={style}>{props.emoji}</Animated.Text>
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0
  }
})