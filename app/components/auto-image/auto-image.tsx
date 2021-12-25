import React, { useLayoutEffect, useState } from "react"
import { Image as RNImage, ImageProps as DefaultImageProps, ImageURISource, Platform } from "react-native"

type ImageProps = DefaultImageProps & {
  source: ImageURISource
  useRealSize?: boolean
}

export const AutoImage = (props: ImageProps) => {
  const { source, useRealSize } = props
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (source.uri || Platform.OS === "web") {
      RNImage.getSize(source.uri, (width, height) => {
        setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(source)
      setImageSize({ width, height })
    }
  }, [])

  return (
    <RNImage
      {...props}
      resizeMode={"contain"}
      style={[useRealSize ? imageSize : {}, props.style]}
    />
  )
}
