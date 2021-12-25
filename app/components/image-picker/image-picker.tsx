import React from 'react';
import * as ImagePickerExpo from 'expo-image-picker';
import { Icon } from '../icon/icon';
import { ICON } from '../../screens/main/styles';
import { Button } from '../button/button';
import { useStores } from '../../models';

export const ImagePicker = ({gameId}) => {
  const { gamesStore: { createPhotoItem } } = useStores()

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
      <Button preset="primary" onPress={pickImage}>
          <Icon style={ICON} icon={"camera"} />
      </Button>
  );
}