import * as React from "react"
import { ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const BG_GRADIENT: ViewStyle = { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }

const colorSets = {
  'purple': ["#422443", "#281b34"],
}
export interface GradientBackgroundProps {
  set: 'purple'
}

export function GradientBackground(props: GradientBackgroundProps) {
  return <LinearGradient colors={colorSets[props.set]} style={BG_GRADIENT} />
}
