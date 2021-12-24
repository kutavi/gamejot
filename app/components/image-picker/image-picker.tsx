import React, { useState, useEffect } from 'react';
import * as ImagePickerExpo from 'expo-image-picker';
import { Icon } from '../icon/icon';
import { ICON } from '../../screens/main/styles';
import { Button } from '../button/button';
import { useStores } from '../../models';

export const ImagePicker = ({gameId}) => {
  const { gamesStore: { createPhotoItem } } = useStores()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      createPhotoItem(gameId, result.uri);
    }
  };

  return (
    <>
      <Button preset="link" onPress={pickImage}>
          <Icon style={ICON} icon={"camera"} />
      </Button>
    </>
  );
}