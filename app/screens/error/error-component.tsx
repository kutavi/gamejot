import React, { ErrorInfo } from "react"
import { TextStyle, View, ViewStyle, ScrollView, ImageStyle } from "react-native"
import { color } from "../../theme"
import { Button, Icon, Text } from "../../components"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  padding: 16,
  paddingVertical: 50,
  backgroundColor: color.white,
}

const ERROR_DETAILS_CONTAINER: ViewStyle = {
  width: "100%",
  maxHeight: "60%",
  backgroundColor: color.lightGrey,
  marginVertical: 15,
  paddingHorizontal: 10,
  paddingBottom: 15,
  borderRadius: 6,
}

const BTN_RESET: ViewStyle = {
  paddingHorizontal: 40,

  backgroundColor: color.orangeDarker,
}

const TITLE_ERROR: TextStyle = {
  color: color.angry,
  fontWeight: "bold",
  paddingVertical: 15,
}

const CONTENT_ERROR: TextStyle = {
  color: color.angry,
  fontWeight: "bold",
  paddingVertical: 15,
}

// Uncomment this and the Text component in the ErrorComponent if
// you want to see a backtrace in your error reporting screen.
// const CONTENT_BACKTRACE: TextStyle = {
//   color: color.dim,
// }

const ICON: ImageStyle = {
  marginTop: 30,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <View style={CONTAINER}>
      <Icon style={ICON} preset="xl" icon="bug" />
      <Text style={TITLE_ERROR} textKey={"errors.genericError"} />
      <View style={ERROR_DETAILS_CONTAINER}>
        <ScrollView>
          <Text selectable style={CONTENT_ERROR} text={`${props.error}`} />
          {/* <Text selectable style={CONTENT_BACKTRACE} text={`${props.errorInfo.componentStack}`} /> */}
        </ScrollView>
      </View>
      <Button style={BTN_RESET} onPress={props.onReset} textKey="errors.reset" />
    </View>
  )
}
