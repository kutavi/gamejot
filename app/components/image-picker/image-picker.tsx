import React from 'react';
import * as ImagePickerExpo from 'expo-image-picker';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { useStore } from '../../store';

export const ImagePicker = ({gameId}) => {
  const { gamesStore: { createPhotoItem } } = useStore()

  const pickImage = async () => {
    const result = await ImagePickerExpo.launchCameraAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      //  allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled === false) {
      createPhotoItem(gameId, result.uri);
    }
  };

  return (
      <Button onPress={pickImage}>
          <Icon preset="big" icon={"camera"} />
      </Button>
  );
}