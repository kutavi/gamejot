import React, { useLayoutEffect, useState } from "react"
import {
  Image as RNImage,
  ImageProps as DefaultImageProps,
  ImageURISource,
} from "react-native"

type ImageProps = DefaultImageProps & {
  source: ImageURISource
  useRealSize?: boolean;
}

export const AutoImage = (props: ImageProps) => {
  const {source, useRealSize} = props
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (source.uri) {
      RNImage.getSize(source.uri, (width, height) => {
        setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(source)
      setImageSize({ width, height })
    }
  }, [])

  return <RNImage {...props} resizeMode={'contain'} style={[useRealSize ? imageSize : {}, props.style]} />
}
